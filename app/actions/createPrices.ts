'use server';

import { createClient } from '@/utils/supabase/server';

export async function createPrice(priceFormData: any) {
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
    selectedStartDate,
    selectedEndDate,
    currentDateTimestamp,
    room,
    selectedRooms,
    partialPrices,
    partialPricesForChildrens,
  } = priceFormData;

  
  const timestampInSeconds = currentDateTimestamp / 1000;

  const { error } = await supabase.from('prices').insert([
    {
      selected_start_date: selectedStartDate,
      selected_end_date: selectedEndDate,
      current_date_timestamp: new Date(timestampInSeconds * 1000).toISOString(),  
      room: room,
      selected_rooms: selectedRooms,
      partial_prices: partialPrices,
      partial_prices_for_childrens: partialPricesForChildrens,
    },
  ]);
  

  if (error) {
    console.error('Error adding price data:', error);
    return { success: false, error };
  }

  return { success: true };
}
