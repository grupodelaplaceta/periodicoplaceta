export default function Loading() {
  return (
    <div className="wrap" aria-busy="true" aria-live="polite">
      <span className="sr-only">Cargando noticias…</span>
      <div className="sk sk-hero" />
      <div className="sk-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="sk-card">
            <div className="sk sk-img" />
            <div className="sk sk-line w60" />
            <div className="sk sk-line" />
            <div className="sk sk-line w40" />
          </div>
        ))}
      </div>
    </div>
  );
}
