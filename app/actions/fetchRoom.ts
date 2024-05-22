'use server';
import { createClient } from '@/utils/supabase/server';

export async function fetchRooms() {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error('Error fetching user:', authError);
    return { success: false, error: authError.message };
  }

  if (!user) {
    console.error('User not logged in');
    return { success: false, error: 'User not logged in' };
  }

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching rooms:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
