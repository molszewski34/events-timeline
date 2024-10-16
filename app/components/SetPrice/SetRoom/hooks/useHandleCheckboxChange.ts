import React from 'react';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

interface Room {
  id: string;
  num_of_persons: number;
}

interface PriceFormData {
  room: Room;
  selectedRooms: Room[];
  id: string
}

function useHandleCheckboxChange(rooms: Room[]) {
  const { priceFormData, setPriceFormData } = useSetPriceContext();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (priceFormData.selectedRooms.length === 0) return;

    if (e.target.checked) {
      const sameCapacityRooms =
        rooms?.filter(
          (room) =>
            room.num_of_persons === priceFormData.room.num_of_persons &&
            !priceFormData.selectedRooms.some(
              (selectedRoom: PriceFormData) => selectedRoom.id === room.id
            )
        ) || [];

      setPriceFormData((prev: PriceFormData) => ({
        ...prev,
        selectedRooms: [...prev.selectedRooms, ...sameCapacityRooms],
      }));
    } else {
      setPriceFormData((prev: PriceFormData) => ({
        ...prev,
        selectedRooms: [priceFormData.room], 
      }));
    }
  };

  return { handleCheckboxChange };
}

export default useHandleCheckboxChange;
