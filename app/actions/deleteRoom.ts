'use server';
import { createClient } from '@/utils/supabase/server';

import { RoomFormData } from '../contexts/AddRoom/types';

export async function deleteRoom(roomFormData: RoomFormData) {
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

  const {
    selectedRoomId,

  } = roomFormData;

  const { data, error } = await supabase
    .from('rooms')
    .delete()
    .eq('id', selectedRoomId);

  if (error) {
    console.error('Error deleting reservation:', error);
    return { success: false, error };
  }

  return { success: true, data };
}
