import { Room } from '@/app/data/types';

export interface AgeOfKids {
  [index: number]: number;
}

export interface FormData {
  selectedReservationId: string;
  selectedRoomId: string;
  created_at: string;
  selectedStartDate: Date;
  selectedEndDate: Date;
  selectedStatus: SelectedStatus;
  selectedRoom: Room;
  numOfAdults: number;
  numOfKids: number;
  advancePayment: string;
  deposit: string;
  paymentOnPlace: string;
  localTax: number;
  mainGuest: string;
  phone: string;
  email: string;
  houseNumber: string;
  apartmentNumber: string;
  city: string;
  postCode: string;
  country: string;
  passport: string;
  company: string;
  company_street: string;
  company_city: string;
  company_postCode: string;
  company_country: string;
  company_nip: string;
  notes: string;
  registration: string;
  boarding: string;
  passCode: string;
  currentDateTimestamp: number | null
}

export interface SelectedStatus {
  name: string;
  color: string;
}
