import { redirect } from 'next/navigation';
import RoleSelect from '@/components/RoleSelect';
import { supabaseServer } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function Usuarios() {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  const { data: me } = await sb.from('profiles').select('role').eq('id', user.id).maybeSingle();
  if (me?.role !== 'admin') redirect('/admin');
  const { data: people = [] } = await sb.from('profiles').select('id, email, full_name, role, created_at').order('created_at');
  return (
    <>
      <h1>Usuarios y roles</h1>
      <p className="dek">Admin: todo. Redactor: crea y edita noticias. Lector: sin acceso al panel.</p>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th></tr></thead>
          <tbody>
            {people.map((p) => (
              <tr key={p.id}>
                <td>{p.full_name || '—'}</td><td>{p.email}</td>
                <td><RoleSelect id={p.id} role={p.role} isMe={p.id === user.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
