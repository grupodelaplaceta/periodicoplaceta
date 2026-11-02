import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { SECTIONS } from '@/lib/sections';


export default function Header({ active = '' }) {
  return (
    <>
      <a className="skip" href="#main">Saltar al contenido</a>
      <header className="top">
        <div className="wrap row">
          <Link href="/" className="brand" aria-label="Inicio">
            <Image src="/assets/logo.png" alt="Noticias y novedades de Grupo de La Placeta" width={1408} height={421} priority />
          </Link>
          <form action="/buscar" className="search" role="search">
            <input type="search" name="q" placeholder="Buscar noticias" aria-label="Buscar noticias" />
            <button type="submit" aria-label="Buscar"><Icon name="search" className="ki" /></button>
          </form>
          <Link className="btn ghost sm" href="/edicion"><Icon name="print" className="ki" />Edición 7 días</Link>
        </div>
        <nav className="wrap sec" aria-label="Secciones">
          <Link href="/" className={!active ? 'on' : ''}><Icon name="home" className="ki" />Portada</Link>
          {SECTIONS.map((s) => (
            <Link key={s.id} href={`/seccion/${s.id}`} className={active === s.id ? 'on' : ''}>
              <Icon name={s.icon} className="ki" />{s.name}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
