import React, { useState } from 'react';
import SetPriceDatePicker from '../SetPriceDatePicker/SetPriceDatePicker';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

const SetPriceDatePickerSection = () => {
  const { priceFormData, setPriceFormData } = useSetPriceContext();
  const [datePickers, setDatePickers] = useState([
    { id: Date.now(), default: true },
  ]);

  const addDatePicker = () => {
    setDatePickers((prevPickers) => [
      ...prevPickers,
      { id: Date.now(), default: false },
    ]);
  };

  const removeDatePicker = (id) => {
    setDatePickers((prevPickers) =>
      prevPickers.filter((picker) => picker.id !== id)
    );
    setPriceFormData((prevData) => {
      const newData = { ...prevData };
      Object.keys(prevData).forEach((key) => {
        if (
          key.startsWith(`startDate_${id}`) ||
          key.startsWith(`endDate_${id}`)
        ) {
          delete newData[key];
        }
      });
      return newData;
    });
  };

  const handleDateChange = (id, startDate, endDate) => {
    setDatePickers((prevPickers) =>
      prevPickers.map((picker) =>
        picker.id === id ? { ...picker, startDate, endDate } : picker
      )
    );

    setPriceFormData((prevData) => ({
      ...prevData,
      [`startDate_${id}`]: startDate,
      [`endDate_${id}`]: endDate,
    }));
  };

  return (
    <div className="flex flex-col gap-3">
      <header className="border-b-2 border-gray-200 pb-2 font-semibold text-gray-400 text-[13px]">
        <h1 className="text-gray-500">Wybierz Termin</h1>
      </header>
      {datePickers.map(({ id, startDate, endDate, default: isDefault }) => (
        <SetPriceDatePicker
          key={id}
          startDate={priceFormData.selectedStartDate}
          endDate={priceFormData.selectedEndDate}
          onDateChange={(startDate, endDate) =>
            handleDateChange(id, startDate, endDate)
          }
          onRemove={() => removeDatePicker(id)}
          isDefault={isDefault}
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
