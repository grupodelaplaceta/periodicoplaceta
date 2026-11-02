import LegalLayout from '@/components/LegalLayout';

export const metadata = { title: 'Política de cookies', description: 'Qué cookies usa el sitio del Grupo de La Placeta y para qué.', alternates: { canonical: '/cookies' } };

export default function Cookies() {
  return (
    <LegalLayout title="Política de cookies">
      <p>Una cookie es un pequeño archivo que el navegador guarda cuando visitas una web. Esta política explica qué cookies utiliza este sitio, conforme al art. 22.2 de la LSSI-CE y la guía de la Agencia Española de Protección de Datos.</p>
      <h2>Cookies que utilizamos</h2>
      <p>Este sitio <strong>solo utiliza cookies técnicas</strong>, necesarias para su funcionamiento. No utilizamos cookies de publicidad, de perfilado ni de analítica de terceros.</p>
      <ul>
        <li><strong>Sesión de redacción (sb-*-auth-token):</strong> mantiene la sesión de las personas autorizadas en el panel de redacción. Se elimina al cerrar sesión o al expirar. Propia.</li>
        <li><strong>Identificador de visitante (pepl27_visitor):</strong> permite registrar tus «me gusta» sin iniciar sesión. Se guarda en tu navegador (localStorage) y no contiene datos personales. Propia.</li>
        <li><strong>Preferencia de aviso (pepl27_cookies_ok):</strong> recuerda que has leído este aviso. Se guarda en tu navegador (localStorage). Propia.</li>
      </ul>
      <h2>Servicios de terceros</h2>
      <p>La tipografía se carga desde Google Fonts (fonts.googleapis.com), lo que puede transmitir tu dirección IP a Google. Puedes consultar su política en policies.google.com.</p>
      <h2>Cómo gestionar las cookies</h2>
      <p>Puedes eliminar o bloquear cookies desde la configuración de tu navegador. Si bloqueas las cookies técnicas, el panel de redacción no funcionará.</p>
      <h2>Más información</h2>
      <p>Para cualquier duda, escribe a junta@laplaceta.org. Consulta también nuestra <a href="/privacidad">política de privacidad</a>.</p>
    </LegalLayout>
  );
}
