import LegalLayout from '@/components/LegalLayout';

export const metadata = { title: 'Aviso legal', description: 'Aviso legal e información del titular del sitio web del Grupo de La Placeta.', alternates: { canonical: '/aviso-legal' } };

export default function AvisoLegal() {
  return (
    <LegalLayout title="Aviso legal">
      <h2>1. Titular del sitio</h2>
      <p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que el titular de este sitio web es:</p>
      <ul>
        <li>Denominación: [NOMBRE DE LA ENTIDAD]</li>
        <li>CIF: [CIF]</li>
        <li>Domicilio: [DOMICILIO SOCIAL]</li>
        <li>Correo electrónico: junta@laplaceta.org</li>
        <li>Teléfono: [TELÉFONO]</li>
        <li>Datos registrales: [DATOS DEL REGISTRO, si procede]</li>
      </ul>
      <h2>2. Objeto y condiciones de uso</h2>
      <p>Este sitio ofrece información sobre las actividades, noticias y eventos del Grupo de La Placeta. El acceso y uso son gratuitos. El usuario se compromete a utilizar el sitio de forma lícita, sin vulnerar derechos de terceros ni el orden público.</p>
      <h2>3. Propiedad intelectual</h2>
      <p>Los contenidos, textos, diseño, logotipos y elementos gráficos son propiedad del titular o se utilizan con su autorización. Queda prohibida su reproducción, distribución o transformación sin autorización expresa, salvo citas breves que indiquen su procedencia.</p>
      <h2>4. Responsabilidad</h2>
      <p>El titular procura que la información sea exacta y esté actualizada, pero no garantiza la ausencia de errores. No se responde de los daños derivados de enlaces a sitios de terceros ni del uso indebido de la información publicada.</p>
      <h2>5. Legislación aplicable</h2>
      <p>Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa vigente.</p>
    </LegalLayout>
  );
}
