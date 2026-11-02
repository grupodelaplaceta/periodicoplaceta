export default function Loading() {
  return (
    <div className="adm" aria-busy="true" aria-live="polite">
      <span className="sr-only">Cargando…</span>
      <div className="spin" aria-hidden="true" />
      <div className="sk" style={{ height: 44, marginTop: 24 }} />
      <div className="sk" style={{ height: 320, marginTop: 14, borderRadius: 18 }} />
    </div>
  );
}
