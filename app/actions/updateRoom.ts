'use server';

import { RoomFormData } from '../contexts/AddRoom/types';
import { createClient } from '@/utils/supabase/server';

export async function updateRoom(roomFormData: RoomFormData) {
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
    roomName,
    roomGuests,
    roomPrice,
    roomType,
    roomTypeIcon,
    roomDetails,
    roomExtras,
    roomArea,
    roomNumOfPersons,
    roomAdditionalPersons,
    roomNumOfSingleBeds,
    roomNumOfDoubleBeds,
    roomColor,
    roomCountry,
    roomAdress,
    roomPostCode,
    roomCity,
  } = roomFormData;

  const { error } = await supabase.from('rooms').update([
    {
      user_id: user.id,
      name: roomName,
      guests: roomGuests,
      price: roomPrice,
      type: roomType,
      type_icon: roomTypeIcon,
      details: roomDetails,
      extras: roomExtras,
      area: roomArea,
      num_of_persons: roomNumOfPersons,
      additional_persons: roomAdditionalPersons,
      num_of_single_beds: roomNumOfSingleBeds,
      num_of_double_beds: roomNumOfDoubleBeds,
      color: roomColor,
      country: roomCountry.name,
      country_flag_url: roomCountry.file_url,
      address: roomAdress,
      post_code: roomPostCode,
      city: roomCity,
    },
  ]);

  if (error) {
    console.error('Error adding room:', error);
    return { success: false, error };
  }

  return { success: true };
}
