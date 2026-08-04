-- SGAS Pro evidence vault: tenant-scoped metadata and private object storage.
create table if not exists public.evidence_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  created_by uuid not null references auth.users(id) on delete restrict,
  evidence_id text not null,
  upload_date date not null default current_date,
  module text,
  procedure text,
  type text,
  reference text,
  validated_by text,
  status text not null default 'Pendente',
  notes text,
  ps_code text,
  file_path text,
  file_name text,
  file_size bigint check (file_size is null or file_size >= 0),
  expiry_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, evidence_id)
);

create index if not exists evidence_items_organization_idx on public.evidence_items (organization_id);
create index if not exists evidence_items_project_idx on public.evidence_items (project_id, created_at desc);
create index if not exists evidence_items_expiry_idx on public.evidence_items (expiry_date) where expiry_date is not null;

alter table public.evidence_items enable row level security;

create policy "evidence_items_select_org_members"
on public.evidence_items for select to authenticated
using (public.is_org_member(organization_id));

create policy "evidence_items_insert_project_managers"
on public.evidence_items for insert to authenticated
with check (
  public.can_manage_project(organization_id)
  and created_by = (select auth.uid())
);

create policy "evidence_items_update_project_managers"
on public.evidence_items for update to authenticated
using (public.can_manage_project(organization_id))
with check (public.can_manage_project(organization_id));

create policy "evidence_items_delete_project_managers"
on public.evidence_items for delete to authenticated
using (public.can_manage_project(organization_id));

revoke all on table public.evidence_items from anon;
grant select, insert, update, delete on table public.evidence_items to authenticated;
grant all on table public.evidence_items to service_role;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'evidence',
  'evidence',
  false,
  52428800,
  array['application/pdf','image/jpeg','image/png','image/webp','video/mp4','text/plain','text/csv','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "evidence_objects_select_org_members"
on storage.objects for select to authenticated
using (
  bucket_id = 'evidence'
  and exists (
    select 1 from public.organization_members om
    where om.organization_id::text = (storage.foldername(name))[1]
      and om.user_id = (select auth.uid())
      and om.suspended_at is null
  )
);

create policy "evidence_objects_insert_project_managers"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'evidence'
  and exists (
    select 1 from public.organization_members om
    where om.organization_id::text = (storage.foldername(name))[1]
      and om.user_id = (select auth.uid())
      and om.suspended_at is null
      and om.role in ('owner','admin','hse_manager','auditor','member')
  )
);

create policy "evidence_objects_delete_project_managers"
on storage.objects for delete to authenticated
using (
  bucket_id = 'evidence'
  and exists (
    select 1 from public.organization_members om
    where om.organization_id::text = (storage.foldername(name))[1]
      and om.user_id = (select auth.uid())
      and om.suspended_at is null
      and om.role in ('owner','admin','hse_manager')
  )
);
