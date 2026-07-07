create extension if not exists "pgcrypto";

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  year integer not null,
  starts_at timestamptz,
  ends_at timestamptz,
  status text not null default 'planned',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.permissions (
  key text primary key,
  label text not null,
  module text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  system boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.role_permissions (
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_key text not null references public.permissions(key) on delete cascade,
  primary key (role_id, permission_key)
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role_id uuid references public.roles(id),
  role text,
  avatar_url text,
  phone text,
  online boolean not null default false,
  presence_status text not null default 'offline',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete set null,
  title text not null,
  description text,
  priority text,
  status text not null default 'Offen',
  location text,
  due_at timestamptz,
  assigned_to uuid references public.profiles(id) on delete set null,
  assignee_name text,
  completed boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete set null,
  name text not null,
  category text,
  quantity integer not null default 0,
  minimum_stock integer not null default 0,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete set null,
  title text not null,
  category text,
  version text,
  file_url text not null,
  storage_path text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_channels (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete set null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid references public.chat_channels(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.emergency_locations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  name text not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.emergencies (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete set null,
  location_id uuid references public.emergency_locations(id) on delete set null,
  reporter_id uuid references public.profiles(id) on delete set null,
  status text not null default 'active',
  note text,
  gps_lat double precision,
  gps_lng double precision,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.system_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.integrations (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  enabled boolean not null default false,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(provider)
);

insert into public.permissions (key, label, module) values
  ('admin.access', 'Admin Center öffnen', 'admin'),
  ('roles.manage', 'Rollen und Berechtigungen verwalten', 'admin'),
  ('users.manage', 'Benutzer verwalten', 'admin'),
  ('events.manage', 'Events verwalten', 'events'),
  ('crew.read', 'Crew anzeigen', 'crew'),
  ('crew.edit', 'Crew verwalten', 'crew'),
  ('tasks.read', 'Aufgaben anzeigen', 'tasks'),
  ('tasks.create', 'Aufgaben erstellen', 'tasks'),
  ('tasks.edit', 'Aufgaben bearbeiten', 'tasks'),
  ('tasks.delete', 'Aufgaben löschen', 'tasks'),
  ('chat.read', 'Chat lesen', 'chat'),
  ('chat.write', 'Chat schreiben', 'chat'),
  ('inventory.read', 'Inventar anzeigen', 'inventory'),
  ('inventory.edit', 'Inventar verwalten', 'inventory'),
  ('documents.read', 'Dokumente anzeigen', 'documents'),
  ('documents.upload', 'Dokumente hochladen', 'documents'),
  ('documents.delete', 'Dokumente löschen', 'documents'),
  ('budget.view', 'Budget anzeigen', 'budget'),
  ('budget.edit', 'Budget verwalten', 'budget'),
  ('emergency.create', 'Notruf auslösen', 'emergency'),
  ('emergency.manage', 'Notfälle verwalten', 'emergency'),
  ('settings.manage', 'Systemeinstellungen verwalten', 'settings')
on conflict (key) do update set
  label = excluded.label,
  module = excluded.module;

insert into public.roles (name, description, system) values
  ('Administrator', 'Vollzugriff auf die Plattform', true),
  ('Project Lead', 'Operative Leitung mit Verwaltungsrechten', true),
  ('Actor', 'Schauspiel und Crew-Kommunikation', true),
  ('Security', 'Security-Team mit Einsatz- und Notfallzugriff', true),
  ('Gastro', 'Gastro-Team mit Inventarzugriff', true),
  ('Technology', 'Technik-Team mit Aufgaben- und Inventarzugriff', true),
  ('Entrance', 'Einlass-Team mit Aufgaben- und Chat-Zugriff', true),
  ('Volunteer', 'Allgemeiner Crew-Zugriff', true)
on conflict (name) do update set
  description = excluded.description,
  system = excluded.system;

insert into public.role_permissions (role_id, permission_key)
select roles.id, permissions.key
from public.roles
cross join public.permissions
where roles.name = 'Administrator'
on conflict do nothing;

insert into public.role_permissions (role_id, permission_key)
select roles.id, permission_key
from public.roles
cross join (
  values
    ('crew.read'), ('tasks.read'), ('tasks.create'), ('tasks.edit'),
    ('chat.read'), ('chat.write'), ('inventory.read'), ('documents.read'),
    ('events.manage'), ('emergency.create'), ('emergency.manage')
) as allowed(permission_key)
where roles.name = 'Project Lead'
on conflict do nothing;

insert into public.role_permissions (role_id, permission_key)
select roles.id, permission_key
from public.roles
cross join (
  values
    ('crew.read'), ('tasks.read'), ('chat.read'), ('chat.write'),
    ('documents.read'), ('emergency.create')
) as allowed(permission_key)
where roles.name in ('Actor', 'Volunteer', 'Entrance', 'Security', 'Gastro', 'Technology')
on conflict do nothing;

create or replace function public.get_my_permissions()
returns table(permission_key text)
language sql
security definer
set search_path = public
as $$
  select rp.permission_key
  from public.profiles p
  join public.role_permissions rp on rp.role_id = p.role_id
  where p.id = auth.uid()
  union
  select 'admin.access'
  where exists (
    select 1
    from public.profiles p
    join public.roles r on r.id = p.role_id
    where p.id = auth.uid() and r.name = 'Administrator'
  );
$$;

create or replace function public.has_permission(permission text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.get_my_permissions() p
    where p.permission_key = permission
  );
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.log_audit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.audit_logs(actor_id, action, entity, entity_id, metadata)
  values (
    auth.uid(),
    tg_op,
    tg_table_name,
    nullif(to_jsonb(coalesce(new, old))->>'id', '')::uuid,
    jsonb_build_object('table', tg_table_name)
  );
  return coalesce(new, old);
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'events', 'roles', 'profiles', 'tasks', 'inventory', 'documents',
    'system_settings', 'integrations'
  ]
  loop
    execute format('drop trigger if exists touch_%I_updated_at on public.%I', table_name, table_name);
    execute format('create trigger touch_%I_updated_at before update on public.%I for each row execute function public.touch_updated_at()', table_name, table_name);
  end loop;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'events', 'roles', 'role_permissions', 'profiles', 'tasks', 'inventory',
    'documents', 'chat_channels', 'chat_messages', 'emergency_locations',
    'emergencies', 'system_settings', 'integrations'
  ]
  loop
    execute format('drop trigger if exists audit_%I on public.%I', table_name, table_name);
    execute format('create trigger audit_%I after insert or update or delete on public.%I for each row execute function public.log_audit()', table_name, table_name);
  end loop;
end;
$$;

alter table public.events enable row level security;
alter table public.permissions enable row level security;
alter table public.roles enable row level security;
alter table public.role_permissions enable row level security;
alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.inventory enable row level security;
alter table public.documents enable row level security;
alter table public.chat_channels enable row level security;
alter table public.chat_messages enable row level security;
alter table public.emergency_locations enable row level security;
alter table public.emergencies enable row level security;
alter table public.audit_logs enable row level security;
alter table public.system_settings enable row level security;
alter table public.integrations enable row level security;

create policy "permissions read authenticated" on public.permissions
  for select to authenticated using (true);
create policy "roles read authenticated" on public.roles
  for select to authenticated using (true);
create policy "roles manage" on public.roles
  for all to authenticated using (public.has_permission('roles.manage')) with check (public.has_permission('roles.manage'));
create policy "role permissions read authenticated" on public.role_permissions
  for select to authenticated using (true);
create policy "role permissions manage" on public.role_permissions
  for all to authenticated using (public.has_permission('roles.manage')) with check (public.has_permission('roles.manage'));
create policy "profiles read crew" on public.profiles
  for select to authenticated using (public.has_permission('crew.read') or id = auth.uid());
create policy "profiles insert self" on public.profiles
  for insert to authenticated with check (id = auth.uid());
create policy "profiles update self or crew edit" on public.profiles
  for update to authenticated using (id = auth.uid() or public.has_permission('crew.edit'));

create policy "tasks read" on public.tasks
  for select to authenticated using (public.has_permission('tasks.read'));
create policy "tasks insert" on public.tasks
  for insert to authenticated with check (public.has_permission('tasks.create'));
create policy "tasks update" on public.tasks
  for update to authenticated using (public.has_permission('tasks.edit'));
create policy "tasks delete" on public.tasks
  for delete to authenticated using (public.has_permission('tasks.delete'));

create policy "chat channels read" on public.chat_channels
  for select to authenticated using (public.has_permission('chat.read'));
create policy "chat messages read" on public.chat_messages
  for select to authenticated using (public.has_permission('chat.read'));
create policy "chat messages insert" on public.chat_messages
  for insert to authenticated with check (public.has_permission('chat.write'));

create policy "inventory read" on public.inventory
  for select to authenticated using (public.has_permission('inventory.read'));
create policy "inventory write" on public.inventory
  for all to authenticated using (public.has_permission('inventory.edit')) with check (public.has_permission('inventory.edit'));

create policy "documents read" on public.documents
  for select to authenticated using (public.has_permission('documents.read'));
create policy "documents upload" on public.documents
  for insert to authenticated with check (public.has_permission('documents.upload'));
create policy "documents delete" on public.documents
  for delete to authenticated using (public.has_permission('documents.delete'));

create policy "events read authenticated" on public.events
  for select to authenticated using (true);
create policy "events manage" on public.events
  for all to authenticated using (public.has_permission('events.manage')) with check (public.has_permission('events.manage'));

create policy "emergency locations read authenticated" on public.emergency_locations
  for select to authenticated using (active);
create policy "emergency locations manage" on public.emergency_locations
  for all to authenticated using (public.has_permission('emergency.manage')) with check (public.has_permission('emergency.manage'));
create policy "emergencies read manage" on public.emergencies
  for select to authenticated using (public.has_permission('emergency.manage'));
create policy "emergencies create" on public.emergencies
  for insert to authenticated with check (public.has_permission('emergency.create'));
create policy "emergencies manage" on public.emergencies
  for update to authenticated using (public.has_permission('emergency.manage'));

create policy "audit logs admin read" on public.audit_logs
  for select to authenticated using (public.has_permission('admin.access'));
create policy "system settings admin" on public.system_settings
  for all to authenticated using (public.has_permission('settings.manage')) with check (public.has_permission('settings.manage'));
create policy "integrations admin" on public.integrations
  for all to authenticated using (public.has_permission('admin.access')) with check (public.has_permission('admin.access'));

insert into storage.buckets (id, name, public)
values ('documents', 'documents', true)
on conflict (id) do nothing;

create policy "document files read" on storage.objects
  for select to authenticated using (bucket_id = 'documents');
create policy "document files upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'documents' and public.has_permission('documents.upload'));
create policy "document files delete" on storage.objects
  for delete to authenticated using (bucket_id = 'documents' and public.has_permission('documents.delete'));

create index if not exists profiles_role_id_idx on public.profiles(role_id);
create index if not exists tasks_event_id_idx on public.tasks(event_id);
create index if not exists tasks_status_idx on public.tasks(status);
create index if not exists inventory_event_id_idx on public.inventory(event_id);
create index if not exists documents_event_id_idx on public.documents(event_id);
create index if not exists chat_messages_channel_id_created_at_idx on public.chat_messages(channel_id, created_at desc);
create index if not exists emergencies_active_created_at_idx on public.emergencies(active, created_at desc);
create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at desc);
create index if not exists integrations_provider_idx on public.integrations(provider);

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles', 'tasks', 'inventory', 'documents', 'chat_channels',
    'chat_messages', 'events', 'emergency_locations', 'emergencies',
    'roles', 'role_permissions', 'system_settings', 'integrations'
  ]
  loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', table_name);
    exception
      when duplicate_object then null;
      when undefined_object then null;
    end;
  end loop;
end;
$$;
