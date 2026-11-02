import Header from '@/components/Header';
import CookieNotice from '@/components/CookieNotice';

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <footer className="foot">
        <div className="wrap fi">
          <div><strong>Grupo de La Placeta</strong><br />Noticias y novedades de nuestra comunidad.</div>
          <nav aria-label="Pie"><a href="/">Portada</a><a href="/aviso-legal">Aviso legal</a><a href="/privacidad">Privacidad</a><a href="/cookies">Cookies</a><a href="/edicion">Edición 7 días</a><a href="/sitemap.xml">Mapa del sitio</a></nav>
        </div>
        <p className="legal-note">© Grupo de La Placeta. Datos del titular en el <a href="/aviso-legal">aviso legal</a>.</p>
      </footer>
      <CookieNotice />
    </>
  );
}
