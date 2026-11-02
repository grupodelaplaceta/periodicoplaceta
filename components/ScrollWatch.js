'use client';
import { useEffect } from 'react';

// Añade la clase "scrolled" al <body> cuando la página se desplaza (sombra suave en la cabecera)
export default function ScrollWatch() {
  useEffect(() => {
    const f = () => document.body.classList.toggle('scrolled', window.scrollY > 8);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return null;
}
