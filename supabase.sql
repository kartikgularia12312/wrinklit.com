-- Run in Supabase: SQL Editor > New query.
create table if not exists public.waitlist_subscribers (
  id bigint generated always as identity primary key,
  email text not null unique check (email ~* '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),
  created_at timestamptz not null default now()
);

alter table public.waitlist_subscribers enable row level security;

grant usage on schema public to anon;
grant insert on table public.waitlist_subscribers to anon;

drop policy if exists "Anyone can join the waitlist" on public.waitlist_subscribers;

-- The public landing page can insert an email but cannot read subscriber data.
create policy "Anyone can join the waitlist"
on public.waitlist_subscribers
for insert
to anon
with check (true);
