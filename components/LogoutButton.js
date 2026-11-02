'use client';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase-browser';

export default function LogoutButton() {
  const router = useRouter();
  const out = async () => {
    await supabaseBrowser().auth.signOut();
    router.replace('/admin/login');
    router.refresh();
  };
  return <button className="btn ghost sm" onClick={out}>Salir</button>;
}
