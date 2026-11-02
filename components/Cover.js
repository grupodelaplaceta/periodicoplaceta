import Icon from '@/components/Icon';
import { SEC_ICON } from '@/lib/icons';
import { SECTIONS } from '@/lib/sections';

const GRAD = ['135deg,#1c005f,#6d76fa', '160deg,#6d76fa,#1c005f', '60deg,#2a0a80,#8c93ff',
  '200deg,#1c005f,#4a52e0', '110deg,#140046,#6d76fa'];
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
    <div className="cv" role="img" aria-label={label} style={{ background: `linear-gradient(${GRAD[idx % GRAD.length]})` }}>
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
