'use client';
import Icon from '@/components/Icon';

export default function PrintButton() {
  return (
    <button className="btn sm" onClick={() => window.print()}>
      <Icon name="print" className="ki" /> Descargar PDF
    </button>
  );
}
