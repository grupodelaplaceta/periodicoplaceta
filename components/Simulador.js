'use client';
import { useState } from 'react';

export default function Simulador({ title = 'Simulador de cuotas', amount = '10000', months = '60', rate = '4' }) {
  const [P, setP] = useState(+amount || 0);
  const [n, setN] = useState(+months || 1);
  const [r, setR] = useState(+rate || 0);
  const i = r / 100 / 12;
  const cuota = i === 0 ? P / n : (P * i) / (1 - Math.pow(1 + i, -n));
  const eur = (x) => x.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
  return (
    <div className="sim-box">
      <h3>{title}</h3>
      <div className="sim-grid">
        <label>Importe (€)<input type="number" min="0" value={P} onChange={(e) => setP(+e.target.value)} /></label>
        <label>Plazo (meses)<input type="number" min="1" value={n} onChange={(e) => setN(Math.max(1, +e.target.value))} /></label>
        <label>Interés anual (%)<input type="number" min="0" step="0.1" value={r} onChange={(e) => setR(+e.target.value)} /></label>
      </div>
      <p className="sim-res">Cuota mensual estimada: <strong>{isFinite(cuota) ? eur(cuota) : '—'}</strong></p>
      <p className="sim-note">Cálculo orientativo. No constituye una oferta vinculante.</p>
    </div>
  );
}
