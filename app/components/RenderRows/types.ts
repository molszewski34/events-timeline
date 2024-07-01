
import { Database } from '@/types/supabase';


export type Room = Database['public']['Tables']['rooms']['Row'];


export interface FetchedRooms {
  id: string;
  user_id: string;
  name: string;
  guests: number;
  price: number;
  type: string;
  type_icon: string;
  details: string;
  extras: string;
  area: string;
  num_of_persons: number;
  additional_persons: number;
  num_of_single_beds: number;
  num_of_double_beds: number;
  color: string;
  country: string;
  country_flag_url: string;
  address: string;
  post_code: string;
  city: string;
}

export interface Reservation {
  id: string;
  room_id: string;
  selected_start_date: Date;
  selected_end_date: Date;
  selected_status: string;
  num_of_adults: number;
  num_of_kids: number;
  advance_payment: string;
  deposit: string;
  payment_on_place: string;
  local_tax: number;
  main_guest: string;
  phone: string;
  email: string;
  house_number: string;
  apartment_number: string;
  city: string;
  post_code: string;
  country: string;
  passport: string;
  company: string;
  company_street: string;
  company_city: string;
  company_post_code: string;
  company_country: string;
  company_nip: string;
  notes: string;
  pass_code: string;
  registration: string;
  boarding: string;
}


export interface Day {
  date: Date;
  startDate: Date;
  isToday: boolean;
  isSelected: boolean;
  isEventStartDate: boolean;
  eventOverlaySize: string;
  eventTitle: string;
  onMouseEnter: () => void;
}
