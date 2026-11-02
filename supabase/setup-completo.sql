-- ===================================================================
-- SETUP COMPLETO · Periódico Grupo de La Placeta
-- Ejecutar entero en Supabase → SQL Editor. Es re-ejecutable.
-- Admin: junta@laplaceta.org
-- ===================================================================

-- =====================================================================
-- Periódico Grupo de La Placeta · esquema Supabase
-- Ejecutar completo en: Supabase → SQL Editor → New query → Run
-- =====================================================================

-- 1) Perfiles (uno por usuario de auth) con rol
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'redactor' check (role in ('admin','redactor','lector')),
  created_at timestamptz not null default now()
);

-- Crea el perfil automáticamente al registrarse un usuario
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    case when lower(new.email) = 'junta@laplaceta.org' then 'admin' else 'redactor' end
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

-- Funciones de rol (security definer evita recursión en RLS)
create or replace function public.current_role_name()
returns text language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role_name() = 'admin', false)
$$;

create or replace function public.can_edit()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role_name() in ('admin','redactor'), false)
$$;

-- 2) Noticias
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  dek text not null default '',
  section text not null check (section in ('innovacion','grupo','juvenil','junior','eventos-y-festividades')),
  body text not null default '',
  cover_url text,
  icon text,
  featured boolean not null default false,
  status text not null default 'borrador' check (status in ('borrador','publicada')),
  author_id uuid references public.profiles(id) on delete set null,
  author_name text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists articles_status_pub_idx on public.articles (status, published_at desc);
create index if not exists articles_section_idx on public.articles (section);

-- Solo una noticia destacada a la vez
create unique index if not exists articles_one_featured on public.articles (featured) where featured;

-- 3) Seguridad (RLS)
alter table public.profiles enable row level security;
alter table public.articles enable row level security;

-- Perfiles: cada uno ve el suyo; admin ve todos
drop policy if exists "perfil propio o admin ve" on public.profiles;
create policy "perfil propio o admin ve" on public.profiles for select
  using (id = auth.uid() or public.is_admin());

-- Los usuarios solo pueden cambiar su nombre (el rol lo cambia un admin con la función de abajo)
revoke update on public.profiles from authenticated, anon;
grant update (full_name) on public.profiles to authenticated;
drop policy if exists "editar nombre propio" on public.profiles;
create policy "editar nombre propio" on public.profiles for update
  using (id = auth.uid()) with check (id = auth.uid());

-- Noticias: público lee las publicadas; redactores y admin ven y gestionan todo
drop policy if exists "lectura publica de publicadas" on public.articles;
create policy "lectura publica de publicadas" on public.articles for select
  using (status = 'publicada' or public.can_edit());
drop policy if exists "redactores crean" on public.articles;
create policy "redactores crean" on public.articles for insert
  with check (public.can_edit());
drop policy if exists "redactores editan" on public.articles;
create policy "redactores editan" on public.articles for update
  using (public.can_edit()) with check (public.can_edit());
drop policy if exists "solo admin borra" on public.articles;
create policy "solo admin borra" on public.articles for delete
  using (public.is_admin());

-- Cambio de rol: solo admin (función segura)
create or replace function public.set_user_role(target uuid, new_role text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Solo un administrador puede cambiar roles'; end if;
  if new_role not in ('admin','redactor','lector') then raise exception 'Rol no válido'; end if;
  update public.profiles set role = new_role where id = target;
end $$;
grant execute on function public.set_user_role(uuid, text) to authenticated;

-- 4) Almacenamiento de portadas (bucket público de lectura)
insert into storage.buckets (id, name, public) values ('covers','covers',true)
on conflict (id) do nothing;
drop policy if exists "portadas: lectura publica" on storage.objects;
create policy "portadas: lectura publica" on storage.objects for select
  using (bucket_id = 'covers');
drop policy if exists "portadas: redactores suben" on storage.objects;
create policy "portadas: redactores suben" on storage.objects for insert
  with check (bucket_id = 'covers' and public.can_edit());
drop policy if exists "portadas: redactores borran" on storage.objects;
create policy "portadas: redactores borran" on storage.objects for delete
  using (bucket_id = 'covers' and public.is_admin());

-- Si la cuenta junta@laplaceta.org ya existe, la promociona a admin
update public.profiles set role = 'admin' where lower(email) = 'junta@laplaceta.org';

-- Comprobación (debe devolver una fila con role = admin tras registrarse)
-- select email, role from public.profiles where lower(email) = 'junta@laplaceta.org';

-- =====================================================================
-- CREAR EL ADMINISTRADOR
-- 1) Regístrate en /admin/login (o crea el usuario en Authentication → Users
--    con el correo y la contraseña que quieras, y marca "Auto Confirm User").
-- Admin preparado: junta@laplaceta.org (se asigna solo al registrarse).
-- =====================================================================
