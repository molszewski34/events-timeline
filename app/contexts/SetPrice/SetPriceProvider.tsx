'use client';

import { createContext, useContext, useState } from 'react';
import { initialSetPriceData } from './initialSetPriceData';
export const SetPrice = createContext<any>(undefined);

export function SetPriceWrapper({ children }: { children: React.ReactNode }) {
  const [openSetPricePanel, setOpenSetPricePanel] = useState(false);
  const [priceFormData, setPriceFormData] = useState(initialSetPriceData);
  const [isEditingPrice, setisEditingPrice] = useState(false);
  const [room, setRoom] = useState('');
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [currentDateTimestamp, setCurrentDateTimestamp] = useState(null);

  return (
    <SetPrice.Provider
      value={{
        openSetPricePanel,
        setOpenSetPricePanel,
        priceFormData,
        setPriceFormData,
        isEditingPrice,
        setisEditingPrice,
        selectedRooms,
        setSelectedRooms,
        room,
        setRoom,
        currentDateTimestamp,
        setCurrentDateTimestamp,
      }}
    >
      {children}
    </SetPrice.Provider>
  );
}

export function useSetPriceContext() {
  return useContext(SetPrice);
}
