import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import React from 'react';
interface DatePicker {
  id: number;
  isDefault: boolean;
  startDate: Date | null;
  endDate: Date | null;
}

interface PriceFormData {
  dates: DatePicker[];
}
function useHandleAddDatePicker() {
  const { priceFormData, setPriceFormData } = useSetPriceContext() as {
    priceFormData: PriceFormData;
    setPriceFormData: React.Dispatch<React.SetStateAction<PriceFormData>>;
  };

  const handleAddDatePicker = () => {
    const newPickers = [
      ...priceFormData.dates,
      { id: Date.now(), isDefault: false, startDate: null, endDate: null },
    ];

    setPriceFormData((prevData: PriceFormData) => ({
      ...prevData,
      dates: newPickers,
    }));
  };

  return { handleAddDatePicker };
}

export default useHandleAddDatePicker;
