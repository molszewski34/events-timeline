'use client';
import { AgeOfKids } from './types';
import { createContext, useContext, useState } from 'react';
import { Room } from '@/app/components/RenderRows/types';
import { rooms } from '@/app/data/roomsData';
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
  const [selectedRoom, setSelectedroom] = useState<Room | null>(rooms[0]);
  const [roomListOpen, setRoomListOpen] = useState(false);
  const [totalNumOfGuests, setNumOfGuests] = useState<number>(0);
  const [advancePayment, setAdvancePayment] = useState<string>('');
  return (
    <AddReservation.Provider
      value={{
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
        setNumOfGuests,
        advancePayment,
        setAdvancePayment,
      }}
    >
      {children}
    </AddReservation.Provider>
  );
}

export function useAddReservationContext() {
  return useContext(AddReservation);
}
