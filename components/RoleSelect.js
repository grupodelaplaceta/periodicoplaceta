'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase-browser';

export default function RoleSelect({ id, role, isMe }) {
  const router = useRouter();
  const [err, setErr] = useState('');
  const change = async (e) => {
    setErr('');
    const { error } = await supabaseBrowser().rpc('set_user_role', { target: id, new_role: e.target.value });
    if (error) setErr(error.message); else router.refresh();
  };
  return (
    <>
      <select defaultValue={role} onChange={change} disabled={isMe} aria-label="Rol" style={{ padding: '8px 10px', borderRadius: 12, border: '1.5px solid var(--line)', background: 'var(--paper)', color: 'var(--text)', fontWeight: 700 }}>
        <option value="admin">Admin</option><option value="redactor">Redactor</option><option value="lector">Lector</option>
      </select>
      {isMe && <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--muted)' }}>(tú)</span>}
      {err && <div className="msg err" style={{ marginTop: 6 }}>{err}</div>}
    </>
  );
}
