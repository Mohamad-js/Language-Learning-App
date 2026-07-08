create table if not exists public.push_subscriptions (
  endpoint text primary key,
  subscription jsonb not null,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists push_subscriptions_updated_at_idx
  on public.push_subscriptions (updated_at desc);
