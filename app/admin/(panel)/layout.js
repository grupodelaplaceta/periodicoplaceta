import Link from 'next/link';
import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase-server';
import LogoutButton from '@/components/LogoutButton';

export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }) {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect('/admin/login');
  const { data: profile } = await sb.from('pepl27_profiles').select('role, full_name').eq('id', user.id).maybeSingle();
  if (!profile || profile.role === 'lector') {
    return (
      <div className="adm">
        <p className="msg err">
          {!profile
            ? 'Tu cuenta no tiene perfil de redacción todavía. Ejecuta el bloque de reparación de la base de datos (DEPLOY.md, apartado "Reparar cuenta") o pide a un administrador que te dé acceso.'
            : 'Tu cuenta tiene rol de lector y no puede acceder al panel. Pide a un administrador que te dé el rol de redactor o admin.'}
        </p>
        <div className="actions" style={{ marginTop: 14 }}><LogoutButton /></div>
      </div>
    );
  }
  return (
    <>
      <header className="top">
        <div className="wrap row">
          <Link href="/admin" className="brand"><img src="/assets/logo.png" alt="Panel de redacción" height="50" /></Link>
          <div className="actions">
            <Link className="btn ghost sm" href="/">Ver web</Link>
            {profile.role === 'admin' && <Link className="btn ghost sm" href="/admin/usuarios">Usuarios</Link>}
            <span className="pill">{profile.role}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="adm" id="main">{children}</main>
    </>
  );
}
