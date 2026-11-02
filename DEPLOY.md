# Puesta en marcha (todo preparado)

## A. Base de datos (2 minutos)
1. Supabase → SQL Editor → New query.
2. Pega el contenido de `supabase/setup-completo.sql` → Run.
   Crea tablas, seguridad, roles, almacenamiento de portadas y deja admin a junta@laplaceta.org.

## B. Cuenta de administrador
1. Abre la web en `/admin/login`.
2. Pulsa "No tengo cuenta", regístrate con junta@laplaceta.org y elige contraseña.
   Si Supabase pide confirmar el correo, confírmalo desde el email.
3. Entra en `/admin`: debe verse la etiqueta "admin".
   (Si la cuenta existía antes, el script ya la promociona a admin.)

## C. Ejecutar la web
    npm install
    npm run dev                       # http://localhost:3000
    npm run build && npm start        # producción

## D. Publicar en internet (Vercel, gratis)
1. Sube la carpeta a GitHub o usa `npx vercel`.
2. En Vercel → Settings → Environment Variables añade:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
   - NEXT_PUBLIC_SITE_URL = https://periodicoplaceta.vercel.app
3. En Supabase → Authentication → URL Configuration: Site URL = https://periodicoplaceta.vercel.app y añade https://periodicoplaceta.vercel.app/** en Redirect URLs.

## E. Seguridad
- La clave publicable es pública por diseño; la seguridad la aplica la base de datos (RLS).
- Nunca uses la clave `service_role` en el proyecto.
- Como la clave se ha compartido en un chat, conviene rotarla en Supabase → Settings → API.

## F. Reparar cuenta (si aparece "no tiene permisos de redacción")
En Supabase → SQL Editor ejecuta `supabase/reparar-cuenta.sql`. Primero muestra el estado de la cuenta, después la pone como admin y, por último, la comprueba. Cierra sesión en la web y vuelve a entrar.
