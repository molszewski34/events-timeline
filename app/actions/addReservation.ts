'use server';

import { createClient } from '@/utils/supabase/server';
import { FormData } from '../contexts/AddReservation/types';

export async function addReservation(formData: FormData) {
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

  console.log(formData)

  const {
    selectedRoomId,
    created_at,
    selectedStartDate,
    selectedEndDate,
    selectedStatus,
    numOfAdults,
    numOfKids,
    advancePayment,
    deposit,
    paymentOnPlace,
    localTax,
    mainGuest,
    phone,
    email,
    houseNumber,
    apartmentNumber,
    city,
    postCode,
    country,
    passport,
    company,
    company_street,
    company_city,
    company_postCode,
    company_country,
    company_nip,
    notes,
    passCode,
    registration,
    boarding,
  } = formData;

  const { data, error } = await supabase.from('reservations').insert([
    {
      room_id: selectedRoomId,
      created_at: created_at,
      selected_start_date: selectedStartDate,
      selected_end_date: selectedEndDate,
      selected_status: selectedStatus,
      num_of_adults: numOfAdults,
      num_of_kids: numOfKids,
      advance_payment: advancePayment,
      deposit: deposit,
      payment_on_place: paymentOnPlace,
      local_tax: localTax,
      main_guest: mainGuest,
      phone: phone,
      email: email,
      house_number: houseNumber,
      apartment_number: apartmentNumber,
      city: city,
      post_code: postCode,
      country: country,
      passport: passport,
      company: company,
      company_street: company_street,
      company_city: company_city,
      company_post_code: company_postCode,
      company_country: company_country,
      company_nip: company_nip,
      notes: notes,
      pass_code: passCode,
      registration: registration,
      boarding: boarding,
    },
  ]);

  if (error) {
    console.error('Error adding reservation:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
