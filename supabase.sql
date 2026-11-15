-- Run in Supabase: SQL Editor > New query.
create table public.waitlist_subscribers (
  id bigint generated always as identity primary key,
  email text not null unique check (email ~* '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),
  created_at timestamptz not null default now()
);

alter table public.waitlist_subscribers enable row level security;

drop policy if exists "Anyone can join the waitlist" on public.waitlist_subscribers;

-- The public landing page can insert an email but cannot read subscriber data.
create policy "Anyone can join the waitlist"
on public.waitlist_subscribers
for insert
to public
with check (true);
