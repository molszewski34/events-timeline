import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  return (
    <form className="flex gap-4 text-2xl p-4" action={signOut}>
      <button className="material-icon ">logout</button>
    </form>
  );
}
