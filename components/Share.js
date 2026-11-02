import Icon from '@/components/Icon';

export default function Share({ url, title }) {
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  const links = [
    ['WhatsApp', `https://wa.me/?text=${t}%20${u}`],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ['X', `https://twitter.com/intent/tweet?url=${u}&text=${t}`],
    ['Correo', `mailto:?subject=${t}&body=${u}`],
  ];
  return (
    <div className="share" aria-label="Compartir">
      <span><Icon name="share" className="ki" /> Compartir</span>
      {links.map(([label, href]) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
      ))}
    </div>
  );
}
