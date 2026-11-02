'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase-browser';
import { SECTIONS } from '@/lib/sections';
import { ICON } from '@/lib/icons';
import { slugify } from '@/lib/format';

const TOOLS = [
  ['bold', 'N', 'Negrita'], ['italic', 'I', 'Cursiva'], ['underline', 'S', 'Subrayado'],
  ['formatBlock:h2', 'H2', 'Título'], ['formatBlock:h3', 'H3', 'Subtítulo'],
  ['insertUnorderedList', '•', 'Viñetas'], ['insertOrderedList', '1.', 'Numerada'],
  ['formatBlock:blockquote', '❝', 'Cita'], ['createLink', '🔗', 'Enlace'],
  ['insertImage', '🖼', 'Imagen por URL'], ['justifyCenter', '≡', 'Centrar'],
  ['removeFormat', 'Tx', 'Quitar formato'], ['undo', '↶', 'Deshacer'], ['redo', '↷', 'Rehacer'],
];

export default function ArticleForm({ article = null }) {
  const router = useRouter();
  const sb = supabaseBrowser();
  const ed = useRef(null);
  const [f, setF] = useState({
    title: article?.title || '', dek: article?.dek || '', section: article?.section || 'innovacion',
    icon: article?.icon || '', cover_url: article?.cover_url || '', status: article?.status || 'borrador',
    featured: article?.featured || false,
  });
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (ed.current) ed.current.innerHTML = article?.body || '';
    (async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return;
      const { data } = await sb.from('pepl27_profiles').select('role').eq('id', user.id).maybeSingle();
      setRole(data?.role || null);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const cmd = (c) => {
    ed.current.focus();
    if (c.startsWith('formatBlock:')) return document.execCommand('formatBlock', false, c.split(':')[1]);
    if (c === 'createLink') { const u = prompt('URL del enlace'); if (u) document.execCommand('createLink', false, u); return; }
    if (c === 'insertImage') { const u = prompt('URL de la imagen'); if (u) document.execCommand('insertHTML', false, `<img src="${u}" alt="">`); return; }
    document.execCommand(c, false, null);
  };

  const upload = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setBusy(true); setMsg(null);
    const path = `${Date.now()}-${file.name.replace(/[^\w.-]/g, '_')}`;
    const { error } = await sb.storage.from('pepl27_covers').upload(path, file, { cacheControl: '3600' });
    if (error) setMsg({ type: 'err', text: 'No se pudo subir la imagen: ' + error.message });
    else setF((p) => ({ ...p, cover_url: sb.storage.from('pepl27_covers').getPublicUrl(path).data.publicUrl }));
    setBusy(false);
  };

  const save = async (e) => {
    e?.preventDefault(); setMsg(null);
    if (!f.title.trim()) return setMsg({ type: 'err', text: 'Escribe un titular.' });
    setBusy(true);
    const { data: { user } } = await sb.auth.getUser();
    const { data: prof } = await sb.from('pepl27_profiles').select('full_name, email').eq('id', user.id).maybeSingle();
    if (f.featured) await sb.from('pepl27_articles').update({ featured: false }).eq('featured', true).neq('id', article?.id || '00000000-0000-0000-0000-000000000000');
    const row = {
      title: f.title.trim(), dek: f.dek.trim(), section: f.section, icon: f.icon || null,
      cover_url: f.cover_url || null, status: f.status, featured: f.featured,
      body: ed.current.innerHTML, updated_at: new Date().toISOString(),
      published_at: f.status === 'publicada' ? (article?.published_at || new Date().toISOString()) : null,
    };
    let error;
    if (article) ({ error } = await sb.from('pepl27_articles').update(row).eq('id', article.id));
    else ({ error } = await sb.from('pepl27_articles').insert({
      ...row, slug: `${slugify(f.title)}-${Math.random().toString(36).slice(2, 6)}`,
      author_id: user.id, author_name: prof?.full_name || prof?.email || 'Redacción',
    }));
    setBusy(false);
    if (error) return setMsg({ type: 'err', text: error.message });
    router.push('/admin'); router.refresh();
  };

  const remove = async () => {
    if (!article || !confirm('¿Eliminar esta noticia de forma permanente?')) return;
    const { error } = await sb.from('pepl27_articles').delete().eq('id', article.id);
    if (error) return setMsg({ type: 'err', text: error.message });
    router.push('/admin'); router.refresh();
  };

  return (
    <form className="form" onSubmit={save}>
      {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
      <label>Titular<input value={f.title} onChange={set('title')} placeholder="Un titular que enganche" required /></label>
      <label>Entradilla<input value={f.dek} onChange={set('dek')} placeholder="Resumen en una frase" /></label>
      <div className="row2">
        <label>Sección
          <select value={f.section} onChange={set('section')}>{SECTIONS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
        </label>
        <label>Estado
          <select value={f.status} onChange={set('status')}><option value="borrador">Borrador</option><option value="publicada">Publicada</option></select>
        </label>
      </div>

      <div>
        <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--muted)' }}>Portada</span>
        <div className="row2" style={{ marginTop: 8, alignItems: 'end' }}>
          <label>Imagen (URL)<input value={f.cover_url} onChange={set('cover_url')} placeholder="Vacío = portada automática" /></label>
          <label>Subir imagen<input type="file" accept="image/*" onChange={upload} disabled={busy} /></label>
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: '10px 0 8px' }}>Icono de la portada automática (vacío = icono de la sección):</p>
        <div className="icon-pick">
          <button type="button" className={!f.icon ? 'on' : ''} onClick={() => setF({ ...f, icon: '' })} title="Icono de la sección" style={{ fontSize: 11, fontWeight: 800 }}>Auto</button>
          {Object.keys(ICON).map((k) => (
            <button type="button" key={k} title={k} className={f.icon === k ? 'on' : ''} onClick={() => setF({ ...f, icon: k })}>
              <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICON[k] }} />
            </button>
          ))}
        </div>
      </div>

      <label style={{ flexDirection: 'row', alignItems: 'center', gap: 10, textTransform: 'none', letterSpacing: 0, fontSize: 15, color: 'var(--text)' }}>
        <input type="checkbox" checked={f.featured} onChange={set('featured')} style={{ width: 18, height: 18 }} /> Destacar en el banner de portada
      </label>

      <div>
        <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--muted)' }}>Texto</span>
        <div className="tb2" style={{ marginTop: 8 }}>
          {TOOLS.map(([c, label, title]) => (
            <button type="button" key={c} title={title} onMouseDown={(e) => e.preventDefault()} onClick={() => cmd(c)}
              style={c === 'bold' ? { fontWeight: 900 } : c === 'italic' ? { fontStyle: 'italic' } : c === 'underline' ? { textDecoration: 'underline' } : undefined}>
              {label}
            </button>
          ))}
        </div>
        <div ref={ed} className="editor" contentEditable suppressContentEditableWarning style={{ marginTop: 8 }} />
      </div>

      <div className="actions">
        <button className="btn" disabled={busy}>{busy ? 'Guardando…' : article ? 'Guardar cambios' : 'Guardar noticia'}</button>
        <button type="button" className="btn ghost" onClick={() => router.push('/admin')}>Cancelar</button>
        {article && role === 'admin' && <button type="button" className="btn danger" onClick={remove}>Eliminar</button>}
      </div>
    </form>
  );
}
