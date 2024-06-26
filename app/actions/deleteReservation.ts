'use server';
import { createClient } from '@/utils/supabase/server';
import { FormData } from '../contexts/AddReservation/types';

export async function deleteReservation(formData: FormData) {
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
    selectedReservationId,

  } = formData;

  const { data, error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', selectedReservationId);

  if (error) {
    console.error('Error deleting reservation:', error);
    return { success: false, error };
  }

  return { success: true, data };
}
