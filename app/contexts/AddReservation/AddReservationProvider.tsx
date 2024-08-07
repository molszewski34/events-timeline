'use client';
import { AgeOfKids, FormData } from './types';
import { createContext, useContext, useState } from 'react';
import { Room } from '@/app/components/RenderRows/types';
import { Reservation } from '@/app/components/RenderRows/types';
import { rooms } from '@/app/data/roomsData';
import { statuses } from '@/app/components/Reservations/AddReservation/AddReservationPanel/Tabs/Reservation/BookingStatus/data';
import { initialReservationFormData } from './initialReservationFormData';
export const AddReservation = createContext<any>(undefined);
export function AddReservationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openAddReservationPanel, setOpenAddReservationPanel] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [daysBetween, setDaysBetween] = useState(0);
  const [numOfKids, setNumOfKids] = useState<number>(0);
  const [ageOfKids, setAgeOfKids] = useState<AgeOfKids>({});

  const [selectedRoom, setSelectedroom] = useState<Room | null>();
  const [roomListOpen, setRoomListOpen] = useState(false);
  const [totalNumOfGuests, setTotalNumOfGuests] = useState<number>(0);
  const [advancePayment, setAdvancePayment] = useState<string>('');
  const [paymentOnPlace, setPaymentOnPlace] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(0);
  const [localTax, setLocalTax] = useState<number>(0.085);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState<number>(0);
  const [includedTax, setIncludedTax] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');

  const [selectedButton, setSelectedButton] = useState<{
    room: Room | null;
    timestamp: number | null;
  }>({ room: null, timestamp: null });
  const [fetchedReservations, setFetchedReservations] = useState<Reservation[]>(
    []
  );

  const [formData, setFormData] = useState<FormData>(
    initialReservationFormData
  );

  return (
    <AddReservation.Provider
      value={{
        fetchedReservations,
        setFetchedReservations,
        openAddReservationPanel,
        setOpenAddReservationPanel,
        selectedStartDate,
        setSelectedStartDate,
        selectedEndDate,
        setSelectedEndDate,
        daysBetween,
        setDaysBetween,
        numOfKids,
        setNumOfKids,
        ageOfKids,
        setAgeOfKids,
        selectedRoom,
        setSelectedroom,
        roomListOpen,
        setRoomListOpen,
        totalNumOfGuests,
        setTotalNumOfGuests,
        advancePayment,
        setAdvancePayment,
        paymentOnPlace,
        setPaymentOnPlace,
        deposit,
        setDeposit,
        localTax,
        setLocalTax,
        includedTax,
        setIncludedTax,
        formData,
        setFormData,
        selectedRoomId,
        setSelectedRoomId,
        price,
        setPrice,
        tax,
        setTax,
        selectedButton,
        setSelectedButton,
      }}
    >
      {children}
    </AddReservation.Provider>
  );
}

export function useAddReservationContext() {
  return useContext(AddReservation);
}
