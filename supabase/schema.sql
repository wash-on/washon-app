-- WashOn — Supabase schema (spec v0.1.3)
-- Run in the Supabase SQL editor. Auth is handled by Supabase Auth (auth.users);
-- the public.users table below stores the app profile linked to auth.uid().

-- ── Lookup tables ────────────────────────────────────────────
create table if not exists user_profiles (
  user_profiles_id   text primary key,
  user_profiles_name text not null,
  user_profiles_description text
);

create table if not exists vehicle_status (
  vehicle_status_id   text primary key,
  vehicle_status_name text not null,
  vehicle_status_description text
);

create table if not exists services_orders_status (
  services_orders_status_id   text primary key,
  services_orders_status_name text not null,
  services_orders_status_description text
);

create table if not exists social_medias (
  social_medias_id   text primary key,
  social_medias_name text not null,
  social_medias_enabled boolean default true,
  social_medias_description text
);

create table if not exists checklist_in (
  checklist_in_id   text primary key,
  checklist_in_name text not null,
  checklist_in_description text
);

create table if not exists checklist_out (
  checklist_out_id   text primary key,
  checklist_out_name text not null,
  checklist_out_description text
);

create table if not exists messages (
  id serial primary key,
  start_message_global text,
  end_message_global   text
);

-- ── Core tables ──────────────────────────────────────────────
create table if not exists services (
  service_id   text primary key,
  service_name text not null,
  service_enabled boolean default true,
  service_value_global_small  numeric,
  service_value_global_medium numeric,
  service_value_global_large  numeric,
  service_description text
);

create table if not exists users (
  user_id     text primary key,            -- 7-digit sequential business id
  auth_id     uuid references auth.users(id) on delete cascade,
  username    text,
  name        text,
  surname     text,
  cellphone_1 text not null,
  cellphone_2 text,
  email       text not null,
  cpf         text,
  notification_at_start boolean default true,
  notification_at_end   boolean default true,
  user_profile text default 'Client' references user_profiles(user_profiles_name),
  user_notes   text
);

create table if not exists vehicles (
  vehicle_id   text primary key,           -- 4-digit sequential
  owner_id     text references users(user_id) on delete cascade,
  make  text,
  model text,
  license_plate text not null unique,       -- enforce no duplicate plate
  color text,
  fuel  text,
  detailing_category text,
  vehicle_notes text
);

create table if not exists services_orders (
  service_order_id text primary key,        -- 10-digit sequential
  vehicle_id text references vehicles(vehicle_id) on delete cascade,
  services_status jsonb default '[]',       -- [{service_id, service_status, service_value_final}]
  services_time   jsonb default '[]',       -- [{service_id, service_start, service_end}]
  vehicle_status  text default 'scheduled' references vehicle_status(vehicle_status_name),
  service_order_start timestamptz,
  service_order_end   timestamptz,
  service_order_notes text,
  service_order_payment_status boolean default false,
  checklist_in_time   timestamptz,
  checklist_in_photo  text,
  checklist_in_status  jsonb default '[]',
  checklist_out_time  timestamptz,
  checklist_out_photo text,
  checklist_out_status jsonb default '[]'
);

create table if not exists quotations (
  quotation_id text primary key,            -- 10-digit sequential
  vehicle_id text references vehicles(vehicle_id),
  user_id    text references users(user_id),
  services   jsonb default '[]',
  quotation_status text,
  quotation_sent_time timestamptz,
  quotation_notes text
);

-- ── Daily statistics (Essential app functions) ───────────────
create table if not exists daily_statistics (
  stat_date date primary key,
  scheduled int default 0,
  cancelled int default 0,
  on_lot    int default 0,
  awaiting  int default 0,
  in_service int default 0,
  ready     int default 0,
  delivered int default 0
);

-- ── Row Level Security ───────────────────────────────────────
alter table users enable row level security;
alter table vehicles enable row level security;
alter table services_orders enable row level security;

-- Clients can read/write their own records; specialists see all (refine per role later).
create policy "users self read" on users for select using (auth.uid() = auth_id);
create policy "vehicles owner" on vehicles for all
  using (owner_id in (select user_id from users where auth_id = auth.uid()));
