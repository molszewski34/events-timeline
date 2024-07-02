'use client';

import { createContext, useContext, useState } from 'react';
export const AddRoom = createContext<any>(undefined);
import { Room } from '@/app/data/types';
import { initialRoomFormData } from './initialRoomFormData';
export function AddRoomWrapper({ children }: { children: React.ReactNode }) {
  const [fetchedRooms, setFetchedRooms] = useState<Room[]>([]);
  const [roomFormData, setRoomFormData] = useState(initialRoomFormData);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [roomListOpen, setRoomListOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(false);

  return (
    <AddRoom.Provider
      value={{
        fetchedRooms,
        setFetchedRooms,
        roomFormData,
        setRoomFormData,
        openAddRoom,
        setOpenAddRoom,
        roomListOpen,
        setRoomListOpen,
        selectedRoomType,
        setSelectedRoomType,
        openDeletePopup,
        setOpenDeletePopup,
      }}
    >
      {children}
    </AddRoom.Provider>
  );
}

export function useAddRoomContext() {
  return useContext(AddRoom);
}
