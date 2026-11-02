export default function Loading() {
  return (
    <div className="wrap article" aria-busy="true" aria-live="polite">
      <span className="sr-only">Cargando noticia…</span>
      <div className="sk sk-line w40" style={{ margin: '24px 0 0', height: 12 }} />
      <div className="sk a-cover" style={{ marginTop: 20 }} />
      <div className="sk sk-line w60" style={{ height: 36, margin: '22px 0 0' }} />
      <div className="sk sk-line" style={{ height: 18, margin: '18px 0 0' }} />
      <div className="sk sk-line w40" style={{ height: 18, margin: '12px 0 0' }} />
    </div>
  );
}
