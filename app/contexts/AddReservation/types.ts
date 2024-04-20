import { Room } from '@/app/data/types';

export interface AgeOfKids {
  [index: number]: number;
}

export interface FormData {
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
}

export interface SelectedStatus {
  name: string;
  color: string;
}
