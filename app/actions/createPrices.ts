'use server';

import { createClient } from '@/utils/supabase/server';
import { Room } from '../data/types';

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

  const { selectedRoomsIds, partialPrices, partialPricesForChildrens, dates } =
    priceFormData;

  const rowsToInsert = selectedRoomsIds.map((roomId: Room) => ({
    selected_rooms_ids: roomId,
    partial_prices: partialPrices,
    partial_prices_for_childrens: partialPricesForChildrens,
    dates: dates,
  }));

  const { data: insertedData, error } = await supabase
    .from('prices')
    .insert(rowsToInsert);

  if (error) {
    throw new Error(error.message);
  }
  return insertedData;
}
