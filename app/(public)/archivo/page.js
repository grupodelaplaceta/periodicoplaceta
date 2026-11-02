import Link from 'next/link';
import Card from '@/components/Card';
import { SECTIONS } from '@/lib/sections';
import { supabaseServer } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Archivo de noticias', description: 'Histórico de noticias del Grupo de La Placeta por año, mes y sección.', alternates: { canonical: '/archivo' } };

const PER = 12;
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

export default async function Archivo({ searchParams }) {
  const anio = parseInt(searchParams?.anio) || 0;
  const mes = parseInt(searchParams?.mes) || 0;
  const seccion = SECTIONS.find((s) => s.id === searchParams?.seccion)?.id || '';
  const pagina = Math.max(1, parseInt(searchParams?.pagina) || 1);
  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: thisYear - 2024 + 1 }, (_, i) => thisYear - i);

  let q = supabaseServer().from('pepl27_articles').select('*', { count: 'exact' }).eq('status', 'publicada');
  if (anio) {
    const from = mes ? Date.UTC(anio, mes - 1, 1) : Date.UTC(anio, 0, 1);
    const to = mes ? Date.UTC(anio, mes, 1) : Date.UTC(anio + 1, 0, 1);
    q = q.gte('published_at', new Date(from).toISOString()).lt('published_at', new Date(to).toISOString());
  }
  if (seccion) q = q.eq('section', seccion);
  const { data, count } = await q.order('published_at', { ascending: false }).range((pagina - 1) * PER, pagina * PER - 1);
  const items = data || [];
  const pages = Math.max(1, Math.ceil((count || 0) / PER));

  const link = (o) => {
    const p = new URLSearchParams();
    const all = { anio, mes, seccion, pagina, ...o };
    Object.entries(all).forEach(([k, v]) => { if (v && !(k === 'pagina' && v === 1)) p.set(k, v); });
    const s = p.toString();
    return '/archivo' + (s ? `?${s}` : '');
  };

  const grupos = {};
  items.forEach((a) => {
    const d = new Date(a.published_at);
    const k = `${MESES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
    (grupos[k] = grupos[k] || []).push(a);
  });

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Migas"><Link href="/">Portada</Link> / <span>Archivo</span></nav>
      <div className="bh big"><div className="t"><h1>Archivo de noticias</h1></div><span className="cnt">{count || 0} noticias</span></div>

      <form className="filters" method="get" action="/archivo" role="search">
        <label>Año
          <select name="anio" defaultValue={anio || ''}>
            <option value="">Todos</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label>Mes
          <select name="mes" defaultValue={mes || ''}>
            <option value="">Todos</option>
            {MESES.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </select>
        </label>
        <label>Sección
          <select name="seccion" defaultValue={seccion}>
            <option value="">Todas</option>
            {SECTIONS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </label>
        <button className="btn sm" type="submit">Filtrar</button>
        {(anio || mes || seccion) && <Link className="btn ghost sm" href="/archivo">Limpiar</Link>}
      </form>

      {items.length === 0 && <p className="empty">No hay noticias con estos filtros.</p>}
      {Object.entries(grupos).map(([mesAnio, lista]) => (
        <section className="block" key={mesAnio}>
          <h2 className="rel-h">{mesAnio}</h2>
          <div className="grid">{lista.map((a) => <Card key={a.id} a={a} />)}</div>
        </section>
      ))}

      {pages > 1 && (
        <nav className="pager" aria-label="Paginación">
          {pagina > 1 && <Link className="btn ghost sm" href={link({ pagina: pagina - 1 })}>Anterior</Link>}
          <span className="meta">Página {pagina} de {pages}</span>
          {pagina < pages && <Link className="btn ghost sm" href={link({ pagina: pagina + 1 })}>Siguiente</Link>}
        </nav>
      )}
    </div>
  );
}
