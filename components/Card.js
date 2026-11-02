import Link from 'next/link';
import Cover from '@/components/Cover';
import Icon from '@/components/Icon';
import { sectionById } from '@/lib/sections';
import { readMin, fmtDate } from '@/lib/format';

export default function Card({ a, feat = false }) {
  const sec = sectionById(a.section);
  return (
    <article className={`card${feat ? ' feat' : ''}`}>
      <Link href={`/noticias/${a.slug}`} className="ph" tabIndex={-1} aria-hidden="true"><Cover article={a} /></Link>
      <div className="bdy">
        <span className="kick"><Icon name={sec.icon} className="ki" />{sec.name}</span>
        <h3><Link href={`/noticias/${a.slug}`}>{a.title}</Link></h3>
        <p>{a.dek}</p>
        <div className="meta">
          <span>{a.author_name || 'Redacción'}</span><span className="sep" />
          <time dateTime={a.published_at}>{fmtDate(a.published_at, { day: 'numeric', month: 'long' })}</time><span className="sep" />
          <span className="rt"><Icon name="clock" className="ki" />{readMin(a.body)} min</span><span className="sep" /><span className="rt"><Icon name="heart" className="ki" />{a.likes_count || 0}</span>
        </div>
      </div>
    </article>
  );
}
