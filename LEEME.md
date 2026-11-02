# Periódico Grupo de La Placeta · Web

Lee DEPLOY.md para la puesta en marcha paso a paso.

- supabase/setup-completo.sql  → base de datos, roles y admin (junta@laplaceta.org). Ejecutar una vez en Supabase.
- app/                         → web pública (/) y panel de redacción (/admin)
- components/, lib/            → componentes, cliente de Supabase, biblioteca de 65 iconos
- .env.local                   → URL y clave publicable de Supabase (ya configuradas)

Roles: admin (todo + usuarios), redactor (crear y editar), lector (sin panel).
