-- C4: rate limiting para Edge Functions (ai-assistant, create-checkout)
-- Sem policies de leitura/escrita para 'authenticated' — acesso só via service_role
-- (chamado pelas Edge Functions) ou via a RPC SECURITY DEFINER abaixo.

create table if not exists public.rate_limits (
  user_id      uuid        not null,
  bucket       text        not null,
  window_start timestamptz not null default date_trunc('minute', now()),
  count        int         not null default 1,
  primary key (user_id, bucket, window_start)
);

alter table public.rate_limits enable row level security;

-- Incrementa atomicamente o contador da janela corrente (1 minuto) e devolve o novo total.
-- INSERT ... ON CONFLICT ... DO UPDATE ... RETURNING é uma única instrução SQL,
-- por isso é seguro sob concorrência sem lock explícito.
create or replace function public.bump_rate(p_user_id uuid, p_bucket text)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_window timestamptz := date_trunc('minute', now());
  v_count  int;
begin
  insert into rate_limits (user_id, bucket, window_start, count)
  values (p_user_id, p_bucket, v_window, 1)
  on conflict (user_id, bucket, window_start)
  do update set count = rate_limits.count + 1
  returning count into v_count;
  return v_count;
end;
$$;
