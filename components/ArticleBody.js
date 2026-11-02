import Simulador from '@/components/Simulador';

const RE = /<div class="sim"([^>]*)>[\s\S]*?<\/div>/g;

// Separa el HTML del artículo en trozos de texto y simuladores interactivos
export default function ArticleBody({ html = '', className = 'body' }) {
  const parts = [];
  let last = 0, m;
  const re = new RegExp(RE.source, 'g');
  while ((m = re.exec(html))) {
    if (m.index > last) parts.push({ t: 'html', v: html.slice(last, m.index) });
    const attrs = {};
    m[1].replace(/([\w-]+)="([^"]*)"/g, (_, k, v) => { attrs[k] = v.replace(/&quot;/g, '"').replace(/&amp;/g, '&'); });
    parts.push({ t: 'sim', v: attrs });
    last = re.lastIndex;
  }
  if (last < html.length) parts.push({ t: 'html', v: html.slice(last) });
  return (
    <div className={className}>
      {parts.map((p, k) => p.t === 'html'
        ? <div key={k} dangerouslySetInnerHTML={{ __html: p.v }} />
        : <Simulador key={k} title={p.v['data-title']} amount={p.v['data-amount']} months={p.v['data-months']} rate={p.v['data-rate']} />)}
    </div>
  );
}
