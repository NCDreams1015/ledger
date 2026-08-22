-- Run this once in Supabase: Project > SQL Editor > New query > paste > Run

create table if not exists app_data (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Row Level Security stays on by default in Supabase, but this app never
-- talks to Supabase from the browser — only from the Vercel serverless
-- function using the service_role key, which bypasses RLS entirely.
-- So no policies are needed here.
alter table app_data enable row level security;
