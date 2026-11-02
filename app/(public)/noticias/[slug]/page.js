import { notFound } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/Card';
import Cover from '@/components/Cover';
import Icon from '@/components/Icon';
import { sectionById } from '@/lib/sections';
import { readMin, fmtDate } from '@/lib/format';
import { supabaseServer } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

async function getArticle(slug) {
  const { data } = await supabaseServer().from('articles').select('*').eq('slug', slug).eq('status', 'publicada').maybeSingle();
  return data;
}

export async function generateMetadata({ params }) {
  const a = await getArticle(params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.dek,
    alternates: { canonical: `/noticias/${a.slug}` },
    openGraph: { type: 'article', title: a.title, description: a.dek, publishedTime: a.published_at, images: a.cover_url ? [a.cover_url] : [] },
  };
}

export default async function Noticia({ params }) {
  const a = await getArticle(params.slug);
  if (!a) notFound();
  const sec = sectionById(a.section);
  const { data: related = [] } = await supabaseServer().from('articles').select('*')
    .eq('status', 'publicada').eq('section', a.section).neq('id', a.id).limit(3);
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'NewsArticle', headline: a.title, description: a.dek,
    datePublished: a.published_at, dateModified: a.updated_at, inLanguage: 'es',
    author: { '@type': 'Person', name: a.author_name || 'Redacción' },
    publisher: { '@type': 'Organization', name: 'Grupo de La Placeta' },
    ...(a.cover_url ? { image: a.cover_url } : {}),
  };
  return (
    <article className="wrap article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="crumbs" aria-label="Migas"><Link href="/">Portada</Link> / <Link href={`/seccion/${sec.id}`}>{sec.name}</Link></nav>
      <div className="a-cover"><Cover article={a} /></div>
      <span className="kick"><Icon name={sec.icon} className="ki" />{sec.name}</span>
      <h1>{a.title}</h1>
      <p className="dek">{a.dek}</p>
      <div className="meta">
        <span>Por {a.author_name || 'Redacción'}</span><span className="sep" />
        <time dateTime={a.published_at}>{fmtDate(a.published_at)}</time><span className="sep" />
        <span className="rt"><Icon name="clock" className="ki" />{readMin(a.body)} min de lectura</span>
      </div>
      <div className="body" style={{ marginTop: 26 }} dangerouslySetInnerHTML={{ __html: a.body }} />
      {related.length > 0 && (
        <section className="block">
          <h2 className="rel-h">Más de {sec.name}</h2>
          <div className="grid">{related.map((r) => <Card key={r.id} a={r} />)}</div>
        </section>
      )}
    </article>
  );
}
