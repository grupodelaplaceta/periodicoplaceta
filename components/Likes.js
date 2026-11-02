'use client';
import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { supabaseBrowser } from '@/lib/supabase-browser';

const KEY = 'pepl27_visitor';

export default function Likes({ articleId, initial = 0 }) {
  const [n, setN] = useState(initial);
  const [on, setOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    let v = localStorage.getItem(KEY);
    if (!v) { v = crypto.randomUUID(); localStorage.setItem(KEY, v); }
    supabaseBrowser().rpc('pepl27_has_like', { p_article: articleId, p_visitor: v })
      .then(({ data }) => setOn(!!data));
  }, [articleId]);

  const toggle = async () => {
    // Actualización optimista: el contador cambia al instante y se revierte si falla
    const prev = { on, n };
    setOn(!on); setN(on ? n - 1 : n + 1); setBusy(true); setErr('');
    const { data, error } = await supabaseBrowser().rpc('pepl27_toggle_like', { p_article: articleId, p_visitor: localStorage.getItem(KEY) });
    if (error) { setOn(prev.on); setN(prev.n); setErr('No se pudo guardar. Inténtalo de nuevo.'); }
    else if (data) { const r = Array.isArray(data) ? data[0] : data; setOn(r.liked); setN(r.total); }
    setBusy(false);
  };

  return (
    <>
      <button className={`like${on ? ' on' : ''}`} onClick={toggle} disabled={busy} aria-pressed={on}>
        <Icon name="heart" className="ki" /> {n} {n === 1 ? 'me gusta' : 'me gustan'}
      </button>
      {err && <span className="msg err" style={{ marginLeft: 10 }}>{err}</span>}
    </>
  );
}
