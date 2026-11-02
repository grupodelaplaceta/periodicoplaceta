import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Diagnóstico: abre /api/health en el navegador. No muestra claves, solo si existen.
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: Boolean(url),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: Boolean(key),
    NEXT_PUBLIC_SITE_URL: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  };
  let db = 'no probado: faltan variables de entorno';
  if (url && key) {
    try {
      const sb = createClient(url, key);
      const { error } = await sb.from('pepl27_articles').select('id', { head: true, count: 'exact' });
      db = error ? `error: ${error.message}` : 'ok';
    } catch (e) {
      db = `excepción: ${e.message}`;
    }
  }
  return Response.json({ env, db });
}
