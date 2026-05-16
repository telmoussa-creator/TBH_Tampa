-- Tarek Buys Houses — Supabase schema
-- Run in the SQL editor after creating a project.

create extension if not exists pgcrypto;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  address text not null,
  reason text,
  timeline text check (timeline in ('asap','30_days','60_days','90_plus','just_looking')),
  notes text,
  source text default 'web',
  ai_score jsonb,                  -- LeadScore JSON
  tier text check (tier in ('hot','warm','cool','cold')),
  status text default 'new'        -- new | walkthrough | contract | closed | dead
);

create index if not exists leads_tier_status_idx on leads (tier, status);
create index if not exists leads_created_idx on leads (created_at desc);

create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid references leads(id) on delete cascade,
  address text not null,
  facts jsonb not null,            -- PropertyFacts
  avm jsonb not null,              -- AVMResult
  photo_assessment jsonb           -- PhotoAssessment (optional)
);

create index if not exists offers_lead_idx on offers (lead_id);

create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  visitor_id text,
  messages jsonb not null default '[]'::jsonb,
  lead_id uuid references leads(id) on delete set null
);

-- RLS: lock everything by default; service role bypasses.
alter table leads enable row level security;
alter table offers enable row level security;
alter table chat_sessions enable row level security;
