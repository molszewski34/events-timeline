'use client';

import { createContext, useContext, useState } from 'react';
import { RoomFormData } from './types';
export const AddRoom = createContext<any>(undefined);
import { Room } from '@/app/data/types';
export function AddRoomWrapper({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([]);

  const [roomFormData, setRoomFormData] = useState<RoomFormData>({
    user_id: '',
    roomName: '',
    roomGuests: 0,
    roomPrice: 65,
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

  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [roomListOpen, setRoomListOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(false);

  return (
    <AddRoom.Provider
      value={{
        rooms,
        setRooms,
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
