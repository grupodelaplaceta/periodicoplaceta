export default function LegalLayout({ title, children }) {
  return (
    <article className="wrap article legal">
      <nav className="crumbs" aria-label="Migas"><a href="/">Portada</a> / <span>{title}</span></nav>
      <h1>{title}</h1>
      <p className="meta">Última actualización: 2 de noviembre de 2026</p>
      {children}
    </article>
  );
}
