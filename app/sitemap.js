import { supabaseServer } from '@/lib/supabase-server';
import { SECTIONS } from '@/lib/sections';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://periodicoplaceta.vercel.app';
  const { data: arts = [] } = await supabaseServer().from('articles').select('slug,updated_at').eq('status', 'publicada');
  return [
    { url: `${base}/`, changeFrequency: 'daily', priority: 1 },
    ...SECTIONS.map((s) => ({ url: `${base}/seccion/${s.id}`, changeFrequency: 'daily', priority: 0.8 })),
    ...arts.map((a) => ({ url: `${base}/noticias/${a.slug}`, lastModified: a.updated_at, priority: 0.6 })),
  ];
}
