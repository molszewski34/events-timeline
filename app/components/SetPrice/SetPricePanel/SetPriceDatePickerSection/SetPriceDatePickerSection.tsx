import React, { useState } from 'react';
import SetPriceDatePicker from '../SetPriceDatePicker/SetPriceDatePicker';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

interface DatePickerItem {
  id: number;
  isDefault: boolean;
  startDate: Date;
  endDate: Date;
}

interface FormData {
  dates: DatePickerItem[];
}

const SetPriceDatePickerSection: React.FC = () => {
  const { priceFormData, setPriceFormData } = useSetPriceContext() as {
    priceFormData: FormData;
    setPriceFormData: React.Dispatch<React.SetStateAction<FormData>>;
  };

  const [disabledRanges, setDisabledRanges] = useState<
    { start: Date; end: Date }[]
  >([]);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());

  const updateDisabledRanges = (pickers: DatePickerItem[]) => {
    const ranges = pickers
      .filter((picker: DatePickerItem) => picker.startDate && picker.endDate)
      .map((picker: DatePickerItem) => ({
        start: picker.startDate as Date,
        end: picker.endDate as Date,
      }));
    setDisabledRanges(ranges);
  };

  const addDatePicker = () => {
    const newPickers: DatePickerItem[] = [
      ...priceFormData.dates,
      {
        id: Date.now(),
        isDefault: false,
        startDate: new Date(),
        endDate: new Date(),
      },
    ];

    setPriceFormData((prevData: FormData) => ({
      ...prevData,
      dates: newPickers,
    }));

    updateDisabledRanges(newPickers);
  };

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

  const handleDateChange = (
    id: number,
    newStartDate: Date | null,
    newEndDate: Date | null
  ) => {
    const startDate = newStartDate ?? new Date();
    const endDate = newEndDate ?? new Date();

    const newPickers = priceFormData.dates.map((picker: DatePickerItem) =>
      picker.id === id
        ? { ...picker, startDate: startDate, endDate: endDate }
        : picker
    );
    setPriceFormData((prevData: FormData) => ({
      ...prevData,
      dates: newPickers,
    }));
    updateDisabledRanges(newPickers);
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
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
        onClick={addDatePicker}
        className="flex items-center gap-1 text-[#00a541] text-xs text-left rounded font-medium cursor-pointer w-fit"
      >
        <i className="text-xl">add</i>
        <p className="text-xs">Dodaj kolejny termin</p>
      </button>
    </div>
  );
};

export default SetPriceDatePickerSection;
