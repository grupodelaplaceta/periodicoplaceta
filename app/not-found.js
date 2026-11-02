import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap empty" style={{ margin: '60px auto' }}>
      <h1>Página no encontrada</h1>
      <p>Puede que el enlace haya cambiado.</p>
      <Link className="btn" href="/">Volver a la portada</Link>
    </div>
  );
}
