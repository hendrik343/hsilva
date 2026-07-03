-- C5: trigger genérico de audit trail, para uso futuro na Fase 10.
-- Colunas reais de audit_logs confirmadas via `supabase gen types typescript`
-- (G5 — não assumidas): action, actor_id, created_at, id, ip_address, metadata,
-- organization_id, project_id, severity, target_id, target_type, user_agent.
-- Não usa NEW.organization_id/NEW.project_id directamente (compile-time
-- column dependency) porque a função é genérica e vai ser anexada a tabelas
-- que podem não ter essas colunas — lê via to_jsonb(...)->>'col' em vez disso.

create or replace function public.log_change() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_org_id     uuid;
  v_project_id uuid;
  v_target_id  uuid;
begin
  v_org_id     := coalesce((to_jsonb(new)->>'organization_id')::uuid, (to_jsonb(old)->>'organization_id')::uuid);
  v_project_id := coalesce((to_jsonb(new)->>'project_id')::uuid,      (to_jsonb(old)->>'project_id')::uuid);
  v_target_id  := coalesce((to_jsonb(new)->>'id')::uuid,              (to_jsonb(old)->>'id')::uuid);

  insert into audit_logs (organization_id, project_id, actor_id, action, target_type, target_id, metadata)
  values (
    v_org_id, v_project_id, auth.uid(), tg_op, tg_table_name, v_target_id,
    jsonb_build_object('old', to_jsonb(old), 'new', to_jsonb(new))
  );
  return coalesce(new, old);
end $$;

-- ── Teste sandbox (AC C5): cria _audit_test, gera insert/update/delete,
-- confirma 3 linhas em audit_logs, depois remove a tabela E os registos de
-- teste do audit_logs (não deixa resíduo nem no schema nem nos dados).
do $$
declare
  v_count int;
begin
  create table _audit_test (id uuid primary key default gen_random_uuid(), organization_id uuid, project_id uuid, note text);
  create trigger _audit_test_trg
    after insert or update or delete on _audit_test
    for each row execute function log_change();

  insert into _audit_test (note) values ('t1');
  update _audit_test set note = 't1-upd' where note = 't1';
  delete from _audit_test where note = 't1-upd';

  select count(*) into v_count from audit_logs where target_type = '_audit_test';
  if v_count <> 3 then
    raise exception 'C5 sandbox test FAILED: esperava 3 audit_logs, encontrei %', v_count;
  end if;
  raise notice 'C5 sandbox test OK: % audit_logs gerados para insert/update/delete', v_count;

  delete from audit_logs where target_type = '_audit_test';
  drop table _audit_test;
end $$;
