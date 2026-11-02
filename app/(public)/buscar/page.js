import Card from '@/components/Card';
import Icon from '@/components/Icon';
import { supabaseServer } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Buscar', robots: { index: false, follow: true } };

export default async function Buscar({ searchParams }) {
  const q = String(searchParams?.q || '').trim().slice(0, 80);
  let items = [];
  if (q) {
    const t = q.replace(/[%,()*]/g, ' ');
    const { data } = await supabaseServer().from('pepl27_articles').select('*')
      .eq('status', 'publicada').or(`title.ilike.%${t}%,dek.ilike.%${t}%`).order('published_at', { ascending: false });
    items = data || [];
  }
  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Migas"><a href="/">Portada</a> / <span>Buscar</span></nav>
      <div className="bh big"><div className="t"><span className="rz-wrap"><Icon name="search" /></span><h1>Buscar</h1></div></div>
      <form action="/buscar" className="search-page" role="search">
        <input type="search" name="q" defaultValue={q} placeholder="Escribe un tema, persona o palabra" aria-label="Buscar" />
        <button className="btn" type="submit">Buscar</button>
      </form>
      {q && <p className="meta" style={{ margin: '18px 0' }}>{items.length} resultados para «{q}»</p>}
      {q && items.length === 0 && <p className="empty">No hay noticias que coincidan. Prueba con otras palabras.</p>}
      {items.length > 0 && <div className="grid">{items.map((a) => <Card key={a.id} a={a} />)}</div>}
    </div>
  );
}
