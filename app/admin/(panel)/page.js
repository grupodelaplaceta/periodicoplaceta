import Link from 'next/link';
import { supabaseServer } from '@/lib/supabase-server';
import { sectionById } from '@/lib/sections';
import { fmtDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const { data: arts = [] } = await supabaseServer().from('pepl27_articles')
    .select('id, title, section, status, featured, author_name, updated_at').order('updated_at', { ascending: false });
  return (
    <>
      <div className="adm-bar">
        <h1 style={{ margin: 0 }}>Noticias</h1>
        <Link className="btn" href="/admin/nuevo">Nueva noticia</Link>
      </div>
      {arts.length === 0 ? <p className="empty">Todavía no hay noticias. Crea la primera.</p> : (
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead><tr><th>Título</th><th>Sección</th><th>Estado</th><th>Autor</th><th>Actualizada</th><th></th></tr></thead>
            <tbody>
              {arts.map((a) => (
                <tr key={a.id}>
                  <td>{a.featured && <span className="pill warn">Destacada</span>} <strong>{a.title}</strong></td>
                  <td>{sectionById(a.section).name}</td>
                  <td><span className={`pill ${a.status === 'publicada' ? 'ok' : ''}`}>{a.status}</span></td>
                  <td>{a.author_name || '—'}</td>
                  <td>{fmtDate(a.updated_at, { day: 'numeric', month: 'short' })}</td>
                  <td><Link href={`/admin/editar/${a.id}`}>Editar</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
