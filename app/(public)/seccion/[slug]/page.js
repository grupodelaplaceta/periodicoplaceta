import { notFound } from 'next/navigation';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import RosetteIcon from '@/components/RosetteIcon';
import { SECTIONS, sectionById } from '@/lib/sections';
import { supabaseServer } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const s = SECTIONS.find((x) => x.id === params.slug);
  if (!s) return {};
  return { title: s.name, description: `Noticias de ${s.name} del Grupo de La Placeta.`, alternates: { canonical: `/seccion/${s.id}` } };
}

export default async function Seccion({ params }) {
  const sec = SECTIONS.find((s) => s.id === params.slug);
  if (!sec) notFound();
  const { data: items = [], error } = await supabaseServer()
    .from('pepl27_articles').select('*').eq('status', 'publicada').eq('section', sec.id).order('published_at', { ascending: false });
  if (error) console.error('Error sección:', error.message);
  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Migas"><a href="/">Portada</a> / <span>{sec.name}</span></nav>
      <div className="bh big">
        <div className="t"><RosetteIcon name={sec.icon} /><h1>{sec.name}</h1></div>
        <span className="cnt">{items.length} artículos</span>
      </div>
      {items.length ? <div className="grid">{items.map((a) => <Card key={a.id} a={a} />)}</div>
        : <p className="empty">Todavía no hay noticias en esta sección.</p>}
    </div>
  );
}
