'use server';

import { createClient } from '@/utils/supabase/server';

export async function fetchReservations() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('selected_start_date', { ascending: true });

  if (error) {
    console.error('Error fetching reservations:', error);
    return { success: false, error };
  }

  return { success: true, data };
}
