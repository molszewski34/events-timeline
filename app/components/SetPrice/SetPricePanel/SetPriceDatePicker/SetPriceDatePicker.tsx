import React, { useState, useEffect } from 'react';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function SetPriceDatePicker() {
  const {
    setSelectedStartDate,
    setSelectedEndDate,
    priceFormData,
    setPriceFormData,
  } = useSetPriceContext();

  useEffect(() => {
    if (priceFormData.currentDateTimestamp) {
      const date = new Date(priceFormData.currentDateTimestamp);
      setPriceFormData((prevData: any) => ({
        ...prevData,
        selectedStartDate: date,
        selectedEndDate: date,
      }));
    }
  }, [priceFormData.currentDateTimestamp, setPriceFormData]);

  const handleStartDateChange = (date: Date | [Date, Date] | null) => {
    if (date instanceof Date) {
      setPriceFormData((prevData: any) => ({
        ...prevData,
        selectedStartDate: date,
      }));
      setSelectedStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date | [Date, Date] | null) => {
    if (date instanceof Date) {
      setPriceFormData((prevData: any) => ({
        ...prevData,
        selectedEndDate: date,
      }));
      setSelectedEndDate(date);
    }
  };

  return (
    <div className="flex justify-around mt-2 gap-2">
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm">Od</label>
        <div className="relative w-full">
          <DatePicker
            className={'w-full border border-gray-200 p-2 text-xs pr-10'}
            dateFormat="yyyy-MM-dd h:mm"
            selected={priceFormData.selectedStartDate}
            onChange={handleStartDateChange}
            showTimeInput
            timeInputLabel="Czas:"
            data-testid="start-date-picker"
          />
          <span className="material-icons absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm">
            calendar_today
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm">Od</label>
        <div className="relative w-full">
          <DatePicker
            className={'w-full border border-gray-200 p-2 text-xs pr-10'}
            dateFormat="yyyy-MM-dd h:mm"
            selected={priceFormData.selectedEndDate}
            onChange={handleEndDateChange}
            showTimeInput
            timeInputLabel="Czas:"
            data-testid="start-date-picker"
          />
          <span className="material-icons absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm">
            calendar_today
          </span>
        </div>
      </div>
    </div>
  );
}

export default SetPriceDatePicker;
