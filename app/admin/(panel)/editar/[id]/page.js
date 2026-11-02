import { notFound } from 'next/navigation';
import ArticleForm from '@/components/ArticleForm';
import { supabaseServer } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function Editar({ params }) {
  const { data: article } = await supabaseServer().from('articles').select('*').eq('id', params.id).maybeSingle();
  if (!article) notFound();
  return (
    <>
      <h1>Editar noticia</h1>
      <ArticleForm article={article} />
    </>
  );
}
