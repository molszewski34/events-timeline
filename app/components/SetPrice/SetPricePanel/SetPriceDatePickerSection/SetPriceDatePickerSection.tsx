import React, { useState } from 'react';
import SetPriceDatePicker from '../SetPriceDatePicker/SetPriceDatePicker';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import useUpdateDisabledRanges from './hooks/useUpdateDisabledRanges';
import useHandleAddDatePicker from './hooks/useHandleAddDatePicker';
import useRemoveDatePicker from './hooks/useRemoveDatePicker';

interface DatePickerItem {
  id: number;
  isDefault: boolean;
  startDate: Date | null;
  endDate: Date | null;
}

interface FormData {
  dates: DatePickerItem[];
}

const SetPriceDatePickerSection: React.FC = () => {
  const { priceFormData, setPriceFormData } = useSetPriceContext();

  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());

  const { updateDisabledRanges, disabledRanges } = useUpdateDisabledRanges();

  const { handleAddDatePicker } = useHandleAddDatePicker();

  const { removeDatePicker } = useRemoveDatePicker();
  const handleDateChange = (
    id: number,
    newStartDate: Date,
    newEndDate: Date
  ) => {
    const newPickers = priceFormData.dates.map((picker: DatePickerItem) =>
      picker.id === id
        ? { ...picker, startDate: newStartDate, endDate: newEndDate }
        : picker
    );
    setPriceFormData((prevData: FormData) => ({
      ...prevData,
      dates: newPickers,
    }));
    updateDisabledRanges(newPickers);
    setSelectedStartDate(newStartDate);
    setSelectedEndDate(newEndDate);
  };

  return (
    <div className="flex flex-col gap-3">
      <header className="border-b-2 border-gray-200 pb-2 font-semibold text-gray-400 text-[13px]">
        <h1 className="text-gray-500">Wybierz Termin</h1>
      </header>
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
      <button
        type="button"
        onClick={handleAddDatePicker}
        className="flex items-center gap-1 text-[#00a541] text-xs text-left rounded font-medium cursor-pointer w-fit"
      >
        <i className="text-xl">add</i>
        <p className="text-xs">Dodaj kolejny termin</p>
      </button>
    </div>
  );
};

export default SetPriceDatePickerSection;
