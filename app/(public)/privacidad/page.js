import LegalLayout from '@/components/LegalLayout';

export const metadata = { title: 'Política de privacidad', description: 'Cómo tratamos tus datos personales en el sitio del Grupo de La Placeta.', alternates: { canonical: '/privacidad' } };

export default function Privacidad() {
  return (
    <LegalLayout title="Política de privacidad">
      <h2>1. Responsable del tratamiento</h2>
      <p>[NOMBRE DE LA ENTIDAD], CIF [CIF], con domicilio en [DOMICILIO SOCIAL] y correo de contacto junta@laplaceta.org.</p>
      <h2>2. Finalidades y base jurídica</h2>
      <ul>
        <li><strong>Acceso a la información:</strong> navegar por el sitio no requiere facilitar datos personales.</li>
        <li><strong>Gestión de cuentas de redacción:</strong> tratamos el correo electrónico y el nombre de las personas autorizadas para escribir o administrar noticias. Base: ejecución de la relación con la entidad (art. 6.1.b RGPD) e interés legítimo de la entidad en gestionar sus contenidos (art. 6.1.f).</li>
        <li><strong>Publicación de noticias:</strong> las noticias pueden incluir nombres de autores y fotografías de actividades. Base: interés legítimo en informar sobre la actividad de la entidad, y consentimiento cuando sea necesario.</li>
      </ul>
      <h2>3. Imágenes de menores</h2>
      <p>Las fotografías en las que aparezcan menores de edad solo se publicarán con el consentimiento de sus padres, madres o tutores legales, de acuerdo con el art. 7 de la LO 3/2018 (LOPDGDD) y la Ley Orgánica 1/1982 de protección del derecho al honor, a la intimidad y a la propia imagen. Cualquier persona puede solicitar la retirada de una imagen suya o de un menor a su cargo.</p>
      <h2>4. Destinatarios y encargados</h2>
      <p>Para prestar el servicio se utilizan proveedores que tratan datos por cuenta de la entidad: Supabase (base de datos, autenticación y almacenamiento) y Vercel (alojamiento de la web). Pueden implicar transferencias internacionales amparadas en las garantías del RGPD (cláusulas contractuales tipo). No se ceden datos a terceros para fines comerciales.</p>
      <h2>5. Plazos de conservación</h2>
      <p>Los datos de las cuentas se conservan mientras la persona esté autorizada para redactar y, después, durante los plazos legales aplicables. Las noticias se conservan como archivo de la entidad, salvo solicitud de retirada justificada.</p>
      <h2>6. Tus derechos</h2>
      <p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a junta@laplaceta.org. Si consideras que no se atiende tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
      <h2>7. Seguridad</h2>
      <p>Aplicamos medidas técnicas y organizativas adecuadas, como cifrado en tránsito, control de acceso por roles y seguridad a nivel de fila en la base de datos.</p>
    </LegalLayout>
  );
}
