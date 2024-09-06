import React, { useState } from 'react';
import SetPriceDatePicker from '../SetPriceDatePicker/SetPriceDatePicker';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

const SetPriceDatePickerSection = () => {
  const { priceFormData, setPriceFormData } = useSetPriceContext();
  const [datePickers, setDatePickers] = useState([
    { id: Date.now(), isDefault: true },
  ]);
  const [disabledRanges, setDisabledRanges] = useState([]);

  const updateDisabledRanges = (pickers) => {
    const ranges = pickers
      .filter(({ startDate, endDate }) => startDate && endDate)
      .map(({ startDate, endDate }) => ({
        start: startDate,
        end: endDate,
      }));
    setDisabledRanges(ranges);
  };

  const addDatePicker = () => {
    const newPickers = [...datePickers, { id: Date.now(), isDefault: false }];
    setDatePickers(newPickers);
    updateDisabledRanges(newPickers);
  };

  const removeDatePicker = (id) => {
    const newPickers = datePickers.filter((picker) => picker.id !== id);
    setDatePickers(newPickers);
    updateDisabledRanges(newPickers);
  };

  const handleDateChange = (id, newStartDate, newEndDate) => {
    const newPickers = datePickers.map((picker) =>
      picker.id === id
        ? { ...picker, startDate: newStartDate, endDate: newEndDate }
        : picker
    );
    setDatePickers(newPickers);
    updateDisabledRanges(newPickers);

    setPriceFormData((prevData) => ({
      ...prevData,
      selectedStartDate: newStartDate,
      selectedEndDate: newEndDate,
    }));
  };

  return (
    <div className="flex flex-col gap-3">
      <header className="border-b-2 border-gray-200 pb-2 font-semibold text-gray-400 text-[13px]">
        <h1 className="text-gray-500">Wybierz Termin</h1>
      </header>
      {datePickers.map(({ id, isDefault }) => (
        <SetPriceDatePicker
          key={id}
          startDate={priceFormData.selectedStartDate}
          endDate={priceFormData.selectedEndDate}
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
        className=" text-green-600 text-sm text-left rounded"
      >
        + Dodaj Kolejny Termin
      </button>
    </div>
  );
};

export default SetPriceDatePickerSection;
