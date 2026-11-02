'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(!localStorage.getItem('pepl27_cookies_ok')); }, []);
  if (!show) return null;
  return (
    <div className="cookie" role="dialog" aria-label="Aviso de cookies">
      <p>Usamos solo cookies técnicas necesarias para el funcionamiento de la web. No usamos cookies de publicidad ni de análisis. <Link href="/cookies">Más información</Link></p>
      <button className="btn sm" onClick={() => { localStorage.setItem('pepl27_cookies_ok', '1'); setShow(false); }}>Entendido</button>
    </div>
  );
}
