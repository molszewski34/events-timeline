import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import React from 'react';
import useUpdateDisabledRanges from './useUpdateDisabledRanges';

function useRemoveDatePicker() {
  const { priceFormData, setPriceFormData } = useSetPriceContext();
  const { updateDisabledRanges } = useUpdateDisabledRanges();

  const removeDatePicker = (id: number) => {
    const newPickers = priceFormData.dates.filter(
      (picker: DatePickerItem) => picker.id !== id
    );

    setPriceFormData((prevData: FormData) => ({
      ...prevData,
      dates: newPickers,
    }));
    updateDisabledRanges(newPickers);
  };

  return {
    removeDatePicker,
  };
}

export default useRemoveDatePicker;
