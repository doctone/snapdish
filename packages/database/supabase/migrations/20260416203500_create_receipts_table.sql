create table public.receipts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  storage_path text not null,
  original_filename text not null,
  content_type text not null,
  size_bytes bigint not null,
  created_at timestamptz not null default now()
);

create index receipts_user_id_idx on public.receipts (user_id);

alter table public.receipts enable row level security;

create policy "Users can select their own receipts"
on public.receipts
for select
using (user_id = auth.uid());

create policy "Users can insert their own receipts"
on public.receipts
for insert
with check (user_id = auth.uid());

create policy "Users can update their own receipts"
on public.receipts
for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Users can delete their own receipts"
on public.receipts
for delete
using (user_id = auth.uid());
