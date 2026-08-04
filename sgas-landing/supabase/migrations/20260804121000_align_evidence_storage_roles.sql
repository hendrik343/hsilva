-- Keep object upload/delete permissions aligned with the application's
-- existing project-management authorization helper.
drop policy if exists "evidence_objects_insert_project_managers" on storage.objects;
create policy "evidence_objects_insert_project_managers"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'evidence'
  and exists (
    select 1 from public.organization_members om
    where om.organization_id::text = (storage.foldername(name))[1]
      and om.user_id = (select auth.uid())
      and om.suspended_at is null
      and public.can_manage_project(om.organization_id)
  )
);

drop policy if exists "evidence_objects_delete_project_managers" on storage.objects;
create policy "evidence_objects_delete_project_managers"
on storage.objects for delete to authenticated
using (
  bucket_id = 'evidence'
  and exists (
    select 1 from public.organization_members om
    where om.organization_id::text = (storage.foldername(name))[1]
      and om.user_id = (select auth.uid())
      and om.suspended_at is null
      and public.can_manage_project(om.organization_id)
  )
);
