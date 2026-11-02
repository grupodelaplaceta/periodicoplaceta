import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://periodicoplaceta.vercel.app'),
  title: { default: 'Noticias y Novedades · Grupo de La Placeta', template: '%s · Grupo de La Placeta' },
  description: 'Noticias, actividades y eventos del Grupo de La Placeta.',
  alternates: { types: { 'application/rss+xml': '/feed.xml' } },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
