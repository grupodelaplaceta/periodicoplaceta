import Cover from '@/components/Cover';
import ArticleBody from '@/components/ArticleBody';
import PrintButton from '@/components/PrintButton';
import { sectionById } from '@/lib/sections';
import { fmtDate } from '@/lib/format';
import { supabaseServer } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Edición de los últimos 7 días', description: 'Las noticias de la última semana del Grupo de La Placeta, para leer o descargar en PDF.', alternates: { canonical: '/edicion' } };

export default async function Edicion() {
  const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
  const { data } = await supabaseServer().from('pepl27_articles').select('*')
    .eq('status', 'publicada').gte('published_at', since).order('published_at', { ascending: false });
  const items = data || [];
  const lead = items.find((a) => a.featured) || items[0];
  const rest = items.filter((a) => a !== lead);
  const hoy = new Date();
  const desde = new Date(hoy.getTime() - 7 * 24 * 3600 * 1000);
  return (
    <div className="wrap ed-wrap">
      <div className="ed-bar no-print">
        <nav className="crumbs"><a href="/">Portada</a> / <span>Edición 7 días</span></nav>
        <PrintButton />
      </div>
      <section className="edition">
        <header className="em">
          <img src="/assets/logo.png" alt="Grupo de La Placeta" width="1408" height="421" />
          <div className="info">EDICIÓN DE LA SEMANA<br />{fmtDate(desde.toISOString(), { day: 'numeric', month: 'long' })} al {fmtDate(hoy.toISOString())}<br />{items.length} noticias</div>
        </header>
        {!lead && <p className="empty">No hay noticias publicadas en los últimos 7 días.</p>}
        {lead && (
          <article className="lead">
            <div><div className="ph"><Cover article={lead} /></div></div>
            <div>
              <span className="kick">{sectionById(lead.section).name}</span>
              <h1>{lead.title}</h1>
              <p className="dk">{lead.dek}</p>
              <p className="sm">{lead.author_name || 'Redacción'} · {fmtDate(lead.published_at, { day: 'numeric', month: 'long' })}</p>
              <ArticleBody html={lead.body} className="body" />
            </div>
          </article>
        )}
        {rest.length > 0 && (
          <div className="ec">
            {rest.map((a) => (
              <article key={a.id}>
                <span className="kick">{sectionById(a.section).name}</span>
                <div className="ph"><Cover article={a} /></div>
                <h3>{a.title}</h3>
                <ArticleBody html={a.body} className="body" />
                <p className="sm">{a.author_name || 'Redacción'} · {fmtDate(a.published_at, { day: 'numeric', month: 'short' })}</p>
              </article>
            ))}
          </div>
        )}
        <footer className="foot2"><span>Grupo de La Placeta · Noticias y novedades</span><span>periodicoplaceta.vercel.app</span></footer>
      </section>
    </div>
  );
}
