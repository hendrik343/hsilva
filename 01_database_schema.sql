-- SGAS Pro SaaS Authentication and Multi-Tenant Database Schema
-- Target: Supabase PostgreSQL
-- Purpose: production-ready tenant isolation, authentication metadata, RBAC,
-- invitations, project access, audit logging, and organization settings.
--
-- How to run:
-- 1. Open Supabase SQL Editor.
-- 2. Paste this entire file.
-- 3. Click Run.
-- 4. Confirm every statement completes successfully.
--
-- Security model:
-- - Supabase Auth owns identities in auth.users.
-- - public.profiles stores application profile fields.
-- - public.organizations is the tenant boundary.
-- - public.organization_members grants user roles inside a tenant.
-- - RLS uses SECURITY DEFINER helper functions to avoid recursive policies.
-- - Every tenant-owned row carries organization_id.
-- - Audit logs are append-only from the application perspective.

begin;

create extension if not exists pgcrypto;
create extension if not exists citext;

do $$
begin
  create type public.organization_role as enum (
    'owner',
    'admin',
    'hse_manager',
    'auditor',
    'member',
    'read_only'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.invitation_status as enum (
    'pending',
    'accepted',
    'revoked',
    'expired'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.project_status as enum (
    'active',
    'paused',
    'archived'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.audit_severity as enum (
    'info',
    'warning',
    'critical'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email citext not null,
  full_name text,
  avatar_url text,
  phone text,
  locale text not null default 'pt-AO',
  timezone text not null default 'Africa/Luanda',
  job_title text,
  department text,
  last_seen_at timestamptz,
  onboarding_completed boolean not null default false,
  marketing_consent boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_email_not_empty check (length(trim(email::text)) > 3)
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug citext not null unique,
  legal_name text,
  tax_id text,
  website text,
  country text not null default 'AO',
  industry text,
  employee_count integer,
  logo_url text,
  billing_email citext,
  owner_id uuid not null references auth.users(id) on delete restrict,
  plan_key text not null default 'trial',
  trial_ends_at timestamptz default (now() + interval '3 days'),
  settings jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  constraint organizations_name_not_empty check (length(trim(name)) > 1),
  constraint organizations_slug_format check (slug ~ '^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$'),
  constraint organizations_employee_count_positive check (employee_count is null or employee_count >= 0)
);

create table if not exists public.organization_settings (
  organization_id uuid primary key references public.organizations(id) on delete cascade,
  allow_magic_link boolean not null default true,
  require_mfa boolean not null default false,
  require_email_confirmation boolean not null default true,
  allowed_email_domains text[] not null default '{}'::text[],
  default_member_role public.organization_role not null default 'member',
  data_retention_days integer not null default 365,
  audit_export_enabled boolean not null default true,
  sso_enabled boolean not null default false,
  sso_provider text,
  notification_settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint organization_settings_retention_positive check (data_retention_days >= 30)
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.organization_role not null default 'member',
  invited_by uuid references auth.users(id) on delete set null,
  suspended_at timestamptz,
  suspended_by uuid references auth.users(id) on delete set null,
  joined_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  unique (organization_id, user_id)
);

create table if not exists public.organization_invitations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  email citext not null,
  role public.organization_role not null default 'member',
  token text not null unique default encode(gen_random_bytes(32), 'hex'),
  status public.invitation_status not null default 'pending',
  invited_by uuid not null references auth.users(id) on delete cascade,
  accepted_by uuid references auth.users(id) on delete set null,
  accepted_at timestamptz,
  revoked_by uuid references auth.users(id) on delete set null,
  revoked_at timestamptz,
  expires_at timestamptz not null default (now() + interval '7 days'),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint organization_invitations_email_not_empty check (length(trim(email::text)) > 3)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  slug citext not null,
  description text,
  status public.project_status not null default 'active',
  site_name text,
  location text,
  country text not null default 'AO',
  starts_at date,
  ends_at date,
  created_by uuid not null references auth.users(id) on delete restrict,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  unique (organization_id, slug),
  constraint projects_name_not_empty check (length(trim(name)) > 1),
  constraint projects_slug_format check (slug ~ '^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$'),
  constraint projects_dates_order check (ends_at is null or starts_at is null or ends_at >= starts_at)
);

create table if not exists public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.organization_role not null default 'member',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, user_id)
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  target_type text,
  target_id uuid,
  severity public.audit_severity not null default 'info',
  ip_address inet,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint audit_logs_action_not_empty check (length(trim(action)) > 1)
);

create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists profiles_last_seen_at_idx on public.profiles(last_seen_at desc);

create index if not exists organizations_owner_id_idx on public.organizations(owner_id);
create index if not exists organizations_slug_idx on public.organizations(slug);
create index if not exists organizations_archived_at_idx on public.organizations(archived_at);

create index if not exists organization_members_user_id_idx on public.organization_members(user_id);
create index if not exists organization_members_org_id_idx on public.organization_members(organization_id);
create index if not exists organization_members_role_idx on public.organization_members(role);
create index if not exists organization_members_active_idx
  on public.organization_members(organization_id, user_id)
  where suspended_at is null;

create index if not exists organization_invitations_email_idx on public.organization_invitations(email);
create index if not exists organization_invitations_org_idx on public.organization_invitations(organization_id);
create index if not exists organization_invitations_token_idx on public.organization_invitations(token);
create index if not exists organization_invitations_pending_idx
  on public.organization_invitations(organization_id, email, status)
  where status = 'pending';

create index if not exists projects_org_idx on public.projects(organization_id);
create index if not exists projects_created_by_idx on public.projects(created_by);
create index if not exists projects_status_idx on public.projects(status);
create index if not exists projects_active_idx
  on public.projects(organization_id, slug)
  where archived_at is null;

create index if not exists project_members_project_idx on public.project_members(project_id);
create index if not exists project_members_org_idx on public.project_members(organization_id);
create index if not exists project_members_user_idx on public.project_members(user_id);

create index if not exists audit_logs_org_created_idx on public.audit_logs(organization_id, created_at desc);
create index if not exists audit_logs_actor_idx on public.audit_logs(actor_id);
create index if not exists audit_logs_project_idx on public.audit_logs(project_id);
create index if not exists audit_logs_action_idx on public.audit_logs(action);
create index if not exists audit_logs_metadata_gin_idx on public.audit_logs using gin(metadata);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists organizations_set_updated_at on public.organizations;
create trigger organizations_set_updated_at
before update on public.organizations
for each row execute function public.set_updated_at();

drop trigger if exists organization_settings_set_updated_at on public.organization_settings;
create trigger organization_settings_set_updated_at
before update on public.organization_settings
for each row execute function public.set_updated_at();

drop trigger if exists organization_members_set_updated_at on public.organization_members;
create trigger organization_members_set_updated_at
before update on public.organization_members
for each row execute function public.set_updated_at();

drop trigger if exists organization_invitations_set_updated_at on public.organization_invitations;
create trigger organization_invitations_set_updated_at
before update on public.organization_invitations
for each row execute function public.set_updated_at();

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists project_members_set_updated_at on public.project_members;
create trigger project_members_set_updated_at
before update on public.project_members
for each row execute function public.set_updated_at();

create or replace function public.slugify(value text)
returns text
language sql
immutable
as $$
  select trim(both '-' from regexp_replace(lower(coalesce(value, '')), '[^a-z0-9]+', '-', 'g'));
$$;

create or replace function public.current_profile_email()
returns citext
language sql
stable
security definer
set search_path = public, auth
as $$
  select coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (select email::text from auth.users where id = auth.uid())
  )::citext;
$$;

create or replace function public.is_org_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members members
    where members.organization_id = target_organization_id
      and members.user_id = auth.uid()
      and members.suspended_at is null
  );
$$;

create or replace function public.has_org_role(
  target_organization_id uuid,
  allowed_roles public.organization_role[]
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members members
    where members.organization_id = target_organization_id
      and members.user_id = auth.uid()
      and members.suspended_at is null
      and members.role = any(allowed_roles)
  );
$$;

create or replace function public.can_manage_org(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_org_role(
    target_organization_id,
    array['owner', 'admin']::public.organization_role[]
  );
$$;

create or replace function public.can_manage_project(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_org_role(
    target_organization_id,
    array['owner', 'admin', 'hse_manager']::public.organization_role[]
  );
$$;

create or replace function public.can_audit_org(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_org_role(
    target_organization_id,
    array['owner', 'admin', 'hse_manager', 'auditor']::public.organization_role[]
  );
$$;

create or replace function public.is_project_member(target_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.project_members members
    where members.project_id = target_project_id
      and members.user_id = auth.uid()
  )
  or exists (
    select 1
    from public.projects projects
    where projects.id = target_project_id
      and public.is_org_member(projects.organization_id)
  );
$$;

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    avatar_url,
    metadata
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url',
    coalesce(new.raw_user_meta_data, '{}'::jsonb)
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_create_profile on auth.users;
create trigger on_auth_user_created_create_profile
after insert on auth.users
for each row execute function public.create_profile_for_new_user();

create or replace function public.create_organization(
  organization_name text,
  organization_slug text default null,
  organization_country text default 'AO'
)
returns public.organizations
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  new_organization public.organizations;
  base_slug text;
  candidate_slug text;
  suffix integer := 0;
begin
  if auth.uid() is null then
    raise exception 'not_authenticated';
  end if;

  base_slug := public.slugify(coalesce(organization_slug, organization_name));
  if base_slug = '' then
    base_slug := 'organization';
  end if;

  candidate_slug := base_slug;
  while exists (select 1 from public.organizations where slug = candidate_slug::citext) loop
    suffix := suffix + 1;
    candidate_slug := base_slug || '-' || suffix::text;
  end loop;

  insert into public.organizations (
    name,
    slug,
    country,
    billing_email,
    owner_id
  )
  values (
    organization_name,
    candidate_slug,
    organization_country,
    public.current_profile_email(),
    auth.uid()
  )
  returning * into new_organization;

  insert into public.organization_settings (organization_id)
  values (new_organization.id)
  on conflict (organization_id) do nothing;

  insert into public.organization_members (
    organization_id,
    user_id,
    role
  )
  values (
    new_organization.id,
    auth.uid(),
    'owner'
  )
  on conflict (organization_id, user_id) do update
  set role = 'owner', suspended_at = null, updated_at = now();

  insert into public.audit_logs (
    organization_id,
    actor_id,
    action,
    target_type,
    target_id,
    severity,
    metadata
  )
  values (
    new_organization.id,
    auth.uid(),
    'organization.created',
    'organization',
    new_organization.id,
    'info',
    jsonb_build_object('name', organization_name, 'slug', candidate_slug)
  );

  return new_organization;
end;
$$;

create or replace function public.accept_organization_invitation(invitation_token text)
returns public.organization_members
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  invitation public.organization_invitations;
  new_member public.organization_members;
  current_email citext;
begin
  if auth.uid() is null then
    raise exception 'not_authenticated';
  end if;

  current_email := public.current_profile_email();

  select *
  into invitation
  from public.organization_invitations
  where token = invitation_token
    and status = 'pending'
  for update;

  if invitation.id is null then
    raise exception 'invitation_not_found';
  end if;

  if invitation.expires_at < now() then
    update public.organization_invitations
    set status = 'expired', updated_at = now()
    where id = invitation.id;
    raise exception 'invitation_expired';
  end if;

  if lower(invitation.email::text) <> lower(current_email::text) then
    raise exception 'invitation_email_mismatch';
  end if;

  insert into public.organization_members (
    organization_id,
    user_id,
    role,
    invited_by
  )
  values (
    invitation.organization_id,
    auth.uid(),
    invitation.role,
    invitation.invited_by
  )
  on conflict (organization_id, user_id) do update
  set
    role = excluded.role,
    suspended_at = null,
    updated_at = now()
  returning * into new_member;

  update public.organization_invitations
  set
    status = 'accepted',
    accepted_by = auth.uid(),
    accepted_at = now(),
    updated_at = now()
  where id = invitation.id;

  insert into public.audit_logs (
    organization_id,
    actor_id,
    action,
    target_type,
    target_id,
    severity,
    metadata
  )
  values (
    invitation.organization_id,
    auth.uid(),
    'invitation.accepted',
    'organization_invitation',
    invitation.id,
    'info',
    jsonb_build_object('email', invitation.email, 'role', invitation.role)
  );

  return new_member;
end;
$$;

create or replace function public.log_auth_event(
  organization_id uuid,
  action text,
  target_type text default null,
  target_id uuid default null,
  severity public.audit_severity default 'info',
  metadata jsonb default '{}'::jsonb
)
returns public.audit_logs
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  event public.audit_logs;
begin
  if organization_id is not null and not public.is_org_member(organization_id) then
    raise exception 'not_authorized';
  end if;

  insert into public.audit_logs (
    organization_id,
    actor_id,
    action,
    target_type,
    target_id,
    severity,
    metadata
  )
  values (
    organization_id,
    auth.uid(),
    action,
    target_type,
    target_id,
    severity,
    coalesce(metadata, '{}'::jsonb)
  )
  returning * into event;

  return event;
end;
$$;

create or replace function public.expire_old_invitations()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  affected integer;
begin
  update public.organization_invitations
  set status = 'expired', updated_at = now()
  where status = 'pending'
    and expires_at < now();

  get diagnostics affected = row_count;
  return affected;
end;
$$;

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_settings enable row level security;
alter table public.organization_members enable row level security;
alter table public.organization_invitations enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "profiles_select_own_or_same_org" on public.profiles;
create policy "profiles_select_own_or_same_org"
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
  or exists (
    select 1
    from public.organization_members mine
    join public.organization_members theirs
      on theirs.organization_id = mine.organization_id
    where mine.user_id = auth.uid()
      and mine.suspended_at is null
      and theirs.user_id = profiles.id
      and theirs.suspended_at is null
  )
);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "organizations_select_members" on public.organizations;
create policy "organizations_select_members"
on public.organizations
for select
to authenticated
using (public.is_org_member(id));

drop policy if exists "organizations_insert_authenticated" on public.organizations;
create policy "organizations_insert_authenticated"
on public.organizations
for insert
to authenticated
with check (owner_id = auth.uid());

drop policy if exists "organizations_update_admins" on public.organizations;
create policy "organizations_update_admins"
on public.organizations
for update
to authenticated
using (public.can_manage_org(id))
with check (public.can_manage_org(id));

drop policy if exists "organizations_delete_owners" on public.organizations;
create policy "organizations_delete_owners"
on public.organizations
for delete
to authenticated
using (public.has_org_role(id, array['owner']::public.organization_role[]));

drop policy if exists "organization_settings_select_members" on public.organization_settings;
create policy "organization_settings_select_members"
on public.organization_settings
for select
to authenticated
using (public.is_org_member(organization_id));

drop policy if exists "organization_settings_manage_admins" on public.organization_settings;
create policy "organization_settings_manage_admins"
on public.organization_settings
for all
to authenticated
using (public.can_manage_org(organization_id))
with check (public.can_manage_org(organization_id));

drop policy if exists "organization_members_select_members" on public.organization_members;
create policy "organization_members_select_members"
on public.organization_members
for select
to authenticated
using (public.is_org_member(organization_id));

drop policy if exists "organization_members_insert_admins" on public.organization_members;
create policy "organization_members_insert_admins"
on public.organization_members
for insert
to authenticated
with check (public.can_manage_org(organization_id));

drop policy if exists "organization_members_update_admins" on public.organization_members;
create policy "organization_members_update_admins"
on public.organization_members
for update
to authenticated
using (public.can_manage_org(organization_id))
with check (public.can_manage_org(organization_id));

drop policy if exists "organization_members_delete_admins" on public.organization_members;
create policy "organization_members_delete_admins"
on public.organization_members
for delete
to authenticated
using (public.can_manage_org(organization_id));

drop policy if exists "organization_invitations_select_admins" on public.organization_invitations;
create policy "organization_invitations_select_admins"
on public.organization_invitations
for select
to authenticated
using (
  public.can_manage_org(organization_id)
  or lower(email::text) = lower(public.current_profile_email()::text)
);

drop policy if exists "organization_invitations_insert_admins" on public.organization_invitations;
create policy "organization_invitations_insert_admins"
on public.organization_invitations
for insert
to authenticated
with check (
  public.can_manage_org(organization_id)
  and invited_by = auth.uid()
);

drop policy if exists "organization_invitations_update_admins" on public.organization_invitations;
create policy "organization_invitations_update_admins"
on public.organization_invitations
for update
to authenticated
using (public.can_manage_org(organization_id))
with check (public.can_manage_org(organization_id));

drop policy if exists "projects_select_members" on public.projects;
create policy "projects_select_members"
on public.projects
for select
to authenticated
using (public.is_org_member(organization_id));

drop policy if exists "projects_insert_managers" on public.projects;
create policy "projects_insert_managers"
on public.projects
for insert
to authenticated
with check (
  public.can_manage_project(organization_id)
  and created_by = auth.uid()
);

drop policy if exists "projects_update_managers" on public.projects;
create policy "projects_update_managers"
on public.projects
for update
to authenticated
using (public.can_manage_project(organization_id))
with check (public.can_manage_project(organization_id));

drop policy if exists "projects_delete_admins" on public.projects;
create policy "projects_delete_admins"
on public.projects
for delete
to authenticated
using (public.can_manage_org(organization_id));

drop policy if exists "project_members_select_org_members" on public.project_members;
create policy "project_members_select_org_members"
on public.project_members
for select
to authenticated
using (public.is_org_member(organization_id));

drop policy if exists "project_members_insert_managers" on public.project_members;
create policy "project_members_insert_managers"
on public.project_members
for insert
to authenticated
with check (public.can_manage_project(organization_id));

drop policy if exists "project_members_update_managers" on public.project_members;
create policy "project_members_update_managers"
on public.project_members
for update
to authenticated
using (public.can_manage_project(organization_id))
with check (public.can_manage_project(organization_id));

drop policy if exists "project_members_delete_managers" on public.project_members;
create policy "project_members_delete_managers"
on public.project_members
for delete
to authenticated
using (public.can_manage_project(organization_id));

drop policy if exists "audit_logs_select_auditors" on public.audit_logs;
create policy "audit_logs_select_auditors"
on public.audit_logs
for select
to authenticated
using (
  organization_id is null
  or public.can_audit_org(organization_id)
);

drop policy if exists "audit_logs_insert_members" on public.audit_logs;
create policy "audit_logs_insert_members"
on public.audit_logs
for insert
to authenticated
with check (
  actor_id = auth.uid()
  and (
    organization_id is null
    or public.is_org_member(organization_id)
  )
);

revoke all on public.profiles from anon;
revoke all on public.organizations from anon;
revoke all on public.organization_settings from anon;
revoke all on public.organization_members from anon;
revoke all on public.organization_invitations from anon;
revoke all on public.projects from anon;
revoke all on public.project_members from anon;
revoke all on public.audit_logs from anon;

grant usage on schema public to authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.organizations to authenticated;
grant select, insert, update, delete on public.organization_settings to authenticated;
grant select, insert, update, delete on public.organization_members to authenticated;
grant select, insert, update, delete on public.organization_invitations to authenticated;
grant select, insert, update, delete on public.projects to authenticated;
grant select, insert, update, delete on public.project_members to authenticated;
grant select, insert on public.audit_logs to authenticated;

grant execute on function public.create_organization(text, text, text) to authenticated;
grant execute on function public.accept_organization_invitation(text) to authenticated;
grant execute on function public.log_auth_event(uuid, text, text, uuid, public.audit_severity, jsonb) to authenticated;
grant execute on function public.expire_old_invitations() to authenticated;

commit;

-- Verification queries to run after deployment:
-- select table_name from information_schema.tables where table_schema = 'public' order by table_name;
-- select policyname, tablename from pg_policies where schemaname = 'public' order by tablename, policyname;
-- select public.expire_old_invitations();
--
-- Expected public tables:
-- 01. audit_logs
-- 02. organization_invitations
-- 03. organization_members
-- 04. organization_settings
-- 05. organizations
-- 06. profiles
-- 07. project_members
-- 08. projects
--
-- Expected core functions:
-- 01. accept_organization_invitation
-- 02. can_audit_org
-- 03. can_manage_org
-- 04. can_manage_project
-- 05. create_organization
-- 06. create_profile_for_new_user
-- 07. current_profile_email
-- 08. expire_old_invitations
-- 09. has_org_role
-- 10. is_org_member
-- 11. is_project_member
-- 12. log_auth_event
-- 13. set_updated_at
-- 14. slugify
--
-- Green-check expectation:
-- Supabase may show fewer or more green checks depending on how the SQL editor groups
-- statements. Success is defined by zero red errors and all tables/policies/functions
-- visible after refresh.
