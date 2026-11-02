import Header from '@/components/Header';

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <footer className="foot">
        <div className="wrap fi">
          <div><strong>Grupo de La Placeta</strong><br />Noticias y novedades de nuestra comunidad.</div>
          <nav aria-label="Pie"><a href="/">Portada</a><a href="/feed.xml">RSS</a><a href="/sitemap.xml">Mapa del sitio</a></nav>
        </div>
      </footer>
    </>
  );
}
