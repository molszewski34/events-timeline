import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import React from 'react';
import useUpdateDisabledRanges from './useUpdateDisabledRanges';

function useHandleAddDatePicker() {
  const { priceFormData, setPriceFormData } = useSetPriceContext() as {
    priceFormData: FormData;
    setPriceFormData: React.Dispatch<React.SetStateAction<FormData>>;
  };

  const { updateDisabledRanges } = useUpdateDisabledRanges();
  const handleAddDatePicker = () => {
    const newPickers: DatePickerItem[] = [
      ...priceFormData.dates,
      { id: Date.now(), isDefault: false, startDate: null, endDate: null },
    ];

    setPriceFormData((prevData: FormData) => ({
      ...prevData,
      dates: newPickers,
    }));

    updateDisabledRanges(newPickers);
  };

  return { handleAddDatePicker };
}

export default useHandleAddDatePicker;
