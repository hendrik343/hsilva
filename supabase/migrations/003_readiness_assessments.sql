-- ============================================================
-- SGAS Pro — Migration 003: Readiness Assessments
-- Conversational wizard output; one active row per org per lang.
-- RLS: only org members can read/write their org's assessments.
-- Project: txkyedcqancetuoxtapf
-- ============================================================

create table if not exists public.readiness_assessments (
  id                   uuid primary key default gen_random_uuid(),
  org_id               uuid not null references public.organizations(id) on delete cascade,
  project_id           uuid references public.projects(id) on delete set null,
  plan                 text not null default 'trial' check (plan in ('trial','paid')),
  lang                 text not null default 'pt' check (lang in ('pt','en','fr')),
  status               text not null default 'partial' check (status in ('partial','complete')),
  score                int check (score between 0 and 100),
  applicable_standards jsonb not null default '[]'::jsonb,
  critical_gaps        jsonb not null default '[]'::jsonb,
  answers              jsonb not null default '{}'::jsonb,
  profile              jsonb not null default '{}'::jsonb,
  updated_at           timestamptz not null default now(),
  created_at           timestamptz not null default now(),
  unique (org_id, lang)
);

create index if not exists idx_readiness_assessments_org
  on public.readiness_assessments (org_id);

create or replace function public.readiness_set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_readiness_updated_at on public.readiness_assessments;
create trigger trg_readiness_updated_at
  before update on public.readiness_assessments
  for each row execute function public.readiness_set_updated_at();

alter table public.readiness_assessments enable row level security;

drop policy if exists "readiness_select" on public.readiness_assessments;
drop policy if exists "readiness_insert" on public.readiness_assessments;
drop policy if exists "readiness_update" on public.readiness_assessments;

-- RLS policies use the live organization membership helper.
create policy "readiness_select"
  on public.readiness_assessments for select
  to authenticated
  using (public.is_org_member(org_id));

create policy "readiness_insert"
  on public.readiness_assessments for insert
  to authenticated
  with check (public.is_org_member(org_id));

create policy "readiness_update"
  on public.readiness_assessments for update
  to authenticated
  using (public.is_org_member(org_id))
  with check (public.is_org_member(org_id));

grant select, insert, update on public.readiness_assessments to authenticated;

alter table public.organizations
  add column if not exists entitlement text
  check (entitlement in ('trial','paid'))
  default null;

comment on column public.organizations.entitlement is
  'null/trial = trial access; paid = full access without trial lock';
