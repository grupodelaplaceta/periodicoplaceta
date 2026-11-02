import Icon from '@/components/Icon';
import { SEC_ICON } from '@/lib/icons';
import { SECTIONS } from '@/lib/sections';

const COLORS = ['#1c005f', '#6d76fa', '#2b1480', '#4b55d8', '#140046'];
const WAVE = Array.from({ length: 97 }, (_, i) => {
  const a = (i / 96) * Math.PI * 2, r = 44 + 5 * Math.cos(12 * a);
  return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
}).join(' ');

export default function Cover({ article, title }) {
  if (article.cover_url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={article.cover_url} alt={title || article.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
  }
  const idx = Math.max(0, SECTIONS.findIndex((s) => s.id === article.section));
  const icon = article.icon || SEC_ICON[article.section] || 'megaphone';
  const label = SECTIONS.find((s) => s.id === article.section)?.name || '';
  return (
    <div className="cv" role="img" aria-label={label} style={{ background: COLORS[idx % COLORS.length] }}>
      <svg className="pat" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke="#fff" strokeWidth=".4">{[18, 30, 42, 54, 66, 78].map((r) => <circle key={r} cx="50" cy="50" r={r} />)}</g>
      </svg>
      <div className="bd">
        <svg className="bg" viewBox="0 0 100 100" aria-hidden="true"><polygon points={WAVE} fill="#fff" /></svg>
        <Icon name={icon} />
      </div>
      <span className="tg">{label}</span>
    </div>
  );
}
