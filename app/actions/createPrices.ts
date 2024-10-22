'use server';

import { createClient } from '@/utils/supabase/server';

//Function returns rooms id from rooms selected in SetRoom component
function extractRoomIds(rooms: any) {
  return rooms.map((room: any) => ({ id: room.id }));
}

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
    currentDateTimestamp,
    room,
    selectedRooms,
    partialPrices,
    partialPricesForChildrens,
    dates,
  } = priceFormData;

  const timestampInSeconds = currentDateTimestamp / 1000;

  const roomIds = extractRoomIds(selectedRooms);

  const { error } = await supabase.from('prices').insert([
    {
      current_date_timestamp: new Date(timestampInSeconds * 1000).toISOString(),
      room: room,
      selected_rooms: roomIds,
      partial_prices: partialPrices,
      partial_prices_for_childrens: partialPricesForChildrens,
      dates: dates,
    },
  ]);

  if (error) {
    console.error('Error adding price data:', error);
    return { success: false, error };
  }

  return { success: true };
}
