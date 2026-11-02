-- =====================================================================
-- REPARAR CUENTA DE ADMINISTRADOR (junta@laplaceta.org)
-- Ejecutar en Supabase → SQL Editor. Es seguro ejecutarlo varias veces.
-- =====================================================================

-- 1) Diagnóstico: ¿existe la cuenta y tiene perfil?
select u.id, u.email, u.created_at, p.role
from auth.users u
left join public.pepl27_profiles p on p.id = u.id
where lower(u.email) = 'junta@laplaceta.org';
-- Si no devuelve filas: la cuenta no está creada → regístrate en /admin/login primero.
-- Si devuelve la fila con role vacío (null): falta el perfil → ejecuta el paso 2.
-- Si role = 'lector' o 'redactor': ejecuta el paso 2 para ponerla en admin.

-- 2) Crear o corregir el perfil como admin
insert into public.pepl27_profiles (id, email, full_name, role)
select u.id, u.email, 'Junta Grupo de La Placeta', 'admin'
from auth.users u
where lower(u.email) = 'junta@laplaceta.org'
on conflict (id) do update set role = 'admin', email = excluded.email;

-- 3) Comprobar que quedó como admin
select u.email, p.role
from auth.users u join public.pepl27_profiles p on p.id = u.id
where lower(u.email) = 'junta@laplaceta.org';

-- 4) Si el paso 2 falla por el disparador antiguo, quítalo y repite el paso 2:
-- drop trigger if exists on_auth_user_created on auth.users;
-- drop trigger if exists pepl27_on_auth_user_created on auth.users;
