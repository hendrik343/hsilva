-- Fase 8 · Stripe Billing (SPEC-001 T8.1)
-- Schema lido do live_types.ts real (gen types, 2026-07-03) antes de escrever isto — G5.
-- Tabelas: subscriptions (1 por organization), billing_events (log de webhooks).
-- Write policies: NENHUMA para `authenticated` — só service_role (Edge Functions) escreve.

do $$ begin
  create type public.subscription_plan as enum ('pilot', 'professional', 'business', 'enterprise');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'unpaid');
exception when duplicate_object then null; end $$;

create table if not exists public.subscriptions (
  id                      uuid primary key default gen_random_uuid(),
  organization_id         uuid not null unique references public.organizations(id) on delete cascade,
  stripe_customer_id      text,
  stripe_subscription_id  text unique,
  plan                    public.subscription_plan,
  status                  public.subscription_status not null default 'trialing',
  current_period_end      timestamptz,
  trial_end               timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create table if not exists public.billing_events (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid references public.organizations(id) on delete set null,
  stripe_event_id  text unique,
  event_type       text not null,
  payload          jsonb not null default '{}'::jsonb,
  created_at       timestamptz not null default now()
);

alter table public.subscriptions enable row level security;
alter table public.billing_events enable row level security;

drop policy if exists "subscriptions_select_org_members" on public.subscriptions;
create policy "subscriptions_select_org_members" on public.subscriptions
  for select using (public.is_org_member(organization_id));

drop policy if exists "billing_events_select_org_members" on public.billing_events;
create policy "billing_events_select_org_members" on public.billing_events
  for select using (organization_id is not null and public.is_org_member(organization_id));

-- Nenhuma policy insert/update/delete para `authenticated` — só service_role (Edge Functions webhook/checkout) escreve.
-- Teste negativo obrigatório (G8, T8.1 AC): confirmar que um user autenticado normal NÃO consegue
-- INSERT directo em subscriptions via anon key + JWT de sessão (deve devolver 42501).

create index if not exists idx_subscriptions_org          on public.subscriptions(organization_id);
create index if not exists idx_subscriptions_stripe_sub    on public.subscriptions(stripe_subscription_id);
create index if not exists idx_billing_events_org          on public.billing_events(organization_id);
create index if not exists idx_billing_events_stripe_event on public.billing_events(stripe_event_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists trg_subscriptions_updated_at on public.subscriptions;
create trigger trg_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();
