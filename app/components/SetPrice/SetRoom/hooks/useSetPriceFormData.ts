import React, { useEffect } from 'react'
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

interface PriceFormData {
  room: string;        
  selectedRooms: string[];   
}
function useSetPriceFormData() {
    const {priceFormData, setPriceFormData} = useSetPriceContext()
    useEffect(() => {
        setPriceFormData((prev: PriceFormData) => ({
          ...prev,
          selectedRooms: [priceFormData.room],
        }));
      }, [priceFormData.room, setPriceFormData]);
}

export default useSetPriceFormData