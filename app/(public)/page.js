import Link from 'next/link';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import RosetteIcon from '@/components/RosetteIcon';
import Cover from '@/components/Cover';
import { SECTIONS } from '@/lib/sections';
import { supabaseServer } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let arts = [];
  try {
    const { data, error } = await supabaseServer()
      .from('pepl27_articles').select('*').eq('status', 'publicada').order('published_at', { ascending: false });
    if (error) throw new Error(error.message);
    arts = data || [];
  } catch (e) {
    console.error('Error cargando noticias:', e.message);
    return <div className="wrap"><p className="empty">No se pueden cargar las noticias en este momento. Inténtalo en unos minutos.</p></div>;
  }
  const lead = arts.find((a) => a.featured) || arts[0];
  const rest = arts.filter((a) => a !== lead);

  return (
    <div className="wrap">
      {lead && (
        <section className="hero">
          <Link href={`/noticias/${lead.slug}`} className="hero-link" aria-label={lead.title}><Cover article={lead} /></Link>
          <div className="txt">
            <span className="ribbon"><Icon name="fire" className="ki" />Destacado</span>
            <h1>{lead.title}</h1>
            <p>{lead.dek}</p>
            <Link className="btn go" href={`/noticias/${lead.slug}`}>Leer la noticia</Link>
          </div>
        </section>
      )}
      {rest.length > 0 && (
        <section className="block">
          <div className="bh"><div className="t"><span className="tile"><Icon name="fire" /></span><h2>Lo último</h2></div></div>
          <div className="grid">{rest.slice(0, 3).map((a) => <Card key={a.id} a={a} />)}</div>
        </section>
      )}
      {SECTIONS.map((s) => {
        const items = rest.filter((a) => a.section === s.id);
        if (!items.length) return null;
        return (
          <section className="block" key={s.id} aria-labelledby={`s-${s.id}`}>
            <div className="bh">
              <div className="t"><RosetteIcon name={s.icon} /><h2 id={`s-${s.id}`}>{s.name}</h2></div>
              <Link className="more" href={`/seccion/${s.id}`}>Ver todo</Link>
            </div>
            <div className="rail">{items.map((a) => <Card key={a.id} a={a} />)}</div>
          </section>
        );
      })}
      {!arts.length && <p className="empty">Aún no hay noticias publicadas.</p>}
    </div>
  );
}
