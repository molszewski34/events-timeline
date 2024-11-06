import React, { useEffect } from 'react';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

interface PriceFormData {
  room: string;
  selectedRooms: string[];
}
function useSetPriceFormData() {
  const { priceFormData, setPriceFormData, setSelectedRooms, room } =
    useSetPriceContext();
  useEffect(() => {
    setSelectedRooms([room]);
    setPriceFormData((prev: PriceFormData) => ({
      ...prev,
      selectedRoomsIds: [room.id],
    }));
  }, [room]);
}

export default useSetPriceFormData;
