'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase-browser';

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState('in');
  const [f, setF] = useState({ email: '', password: '', name: '' });
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setMsg(null);
    const sb = supabaseBrowser();
    if (mode === 'in') {
      const { error } = await sb.auth.signInWithPassword({ email: f.email, password: f.password });
      if (error) setMsg({ type: 'err', text: 'Correo o contraseña incorrectos.' });
      else { router.replace('/admin'); router.refresh(); }
    } else {
      const { data, error } = await sb.auth.signUp({ email: f.email, password: f.password, options: { data: { full_name: f.name } } });
      if (error) setMsg({ type: 'err', text: error.message });
      else if (data.session) { router.replace('/admin'); router.refresh(); }
      else setMsg({ type: 'ok', text: 'Cuenta creada. Confirma tu correo y después inicia sesión.' });
    }
    setBusy(false);
  };

  return (
    <div className="login">
      <img src="/assets/logo.png" alt="Grupo de La Placeta" height="60" style={{ margin: '0 auto 24px' }} />
      <form className="form" onSubmit={submit}>
        <h1 style={{ margin: 0, fontSize: 30 }}>{mode === 'in' ? 'Acceso a redacción' : 'Crear cuenta'}</h1>
        {mode === 'up' && <label>Nombre<input value={f.name} onChange={set('name')} required /></label>}
        <label>Correo<input type="email" autoComplete="email" value={f.email} onChange={set('email')} required /></label>
        <label>Contraseña<input type="password" autoComplete={mode === 'in' ? 'current-password' : 'new-password'} minLength={6} value={f.password} onChange={set('password')} required /></label>
        {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
        <button className="btn" disabled={busy}>{busy ? 'Un momento…' : mode === 'in' ? 'Entrar' : 'Crear cuenta'}</button>
        <button type="button" className="btn ghost sm" onClick={() => { setMode(mode === 'in' ? 'up' : 'in'); setMsg(null); }}>
          {mode === 'in' ? 'No tengo cuenta' : 'Ya tengo cuenta'}
        </button>
      </form>
    </div>
  );
}
