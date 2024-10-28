import React from 'react';
import SetPriceDatePicker from '../SetPriceDatePicker/SetPriceDatePicker';
import useHandleDateChange from './hooks/useHandleDateChange';
import useRemoveDatePicker from './hooks/useRemoveDatePicker';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import useUpdateDisabledRanges from './hooks/useUpdateDisabledRanges';

const RenderPrices = () => {
  const { priceFormData, setPriceFormData } = useSetPriceContext();
  const { disabledRanges, setDisabledRanges } = useUpdateDisabledRanges();

  const { handleDateChange } = useHandleDateChange({
    priceFormData,
    setPriceFormData,
    disabledRanges,
    setDisabledRanges,
  });
  const { removeDatePicker } = useRemoveDatePicker();

  return (
    <div>
      {priceFormData.dates.map(({ id, isDefault, startDate, endDate }) => (
        <SetPriceDatePicker
          key={id}
          startDate={startDate}
          endDate={endDate}
          onDateChange={(newStartDate, newEndDate) =>
            handleDateChange(id, newStartDate, newEndDate)
          }
          onRemove={() => removeDatePicker(id)}
          isDefault={isDefault}
          disabledRanges={disabledRanges}
        />
      ))}
    </div>
  );
};

export default RenderPrices;
