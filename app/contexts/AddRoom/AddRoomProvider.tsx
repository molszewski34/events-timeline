'use client';

import { createContext, useContext, useState } from 'react';
import { RoomFormData } from './types';
export const AddRoom = createContext<any>(undefined);

export function AddRoomWrapper({ children }: { children: React.ReactNode }) {
  const [roomFormData, setRoomFormData] = useState<RoomFormData>({
    user_id: '',
    roomName: '',
    roomGuests: 0,
    roomPrice: 0,
    roomType: 'Pokój',
    roomTypeIcon: 'bed',
    roomDetails: '',
    roomExtras: '',
    roomArea: '',
    roomNumOfPersons: 2,
    roomAdditionalPersons: 0,
    roomNumOfSingleBeds: 2,
    roomNumOfDoubleBeds: 0,
    roomColor: '',
    roomCountry: {
      name: 'Polska',
      file_url: '//upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg',
    },
    roomAdress: '',
    roomPostCode: '',
    roomCity: '',
  });

  console.log(roomFormData);

  console.log(roomFormData.roomType);
  const [openAddRoom, setOpenAddRoom] = useState(true);
  const [roomListOpen, setRoomListOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(false);

  return (
    <AddRoom.Provider
      value={{
        roomFormData,
        setRoomFormData,
        openAddRoom,
        setOpenAddRoom,
        roomListOpen,
        setRoomListOpen,
        selectedRoomType,
        setSelectedRoomType,
      }}
    >
      {children}
    </AddRoom.Provider>
  );
}

export function useAddRoomContext() {
  return useContext(AddRoom);
}
