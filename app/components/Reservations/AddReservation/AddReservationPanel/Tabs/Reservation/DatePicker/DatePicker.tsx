import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale/pl';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import handleCountDaysBetweenDates from './utils/handleCountDaysBetweenDates';

const CustomDatePicker: React.FC = () => {
  const {
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    setDaysBetween,
    formData,
    setFormData,
  } = useAddReservationContext();

  useEffect(() => {
    const days = handleCountDaysBetweenDates(
      formData.selectedStartDate,
      formData.selectedEndDate
    );
    setDaysBetween(days);
  }, [formData.selectedStartDate, formData.selectedEndDate, setDaysBetween]);

  const handleStartDateChange = (date: Date | [Date, Date] | null) => {
    if (date instanceof Date) {
      setFormData((prevData: any) => ({
        ...prevData,
        selectedStartDate: date,
      }));
      setSelectedStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date | [Date, Date] | null) => {
    if (date instanceof Date) {
      setFormData((prevData: any) => ({
        ...prevData,
        selectedEndDate: date,
      }));
      setSelectedEndDate(date);
    }
  };

  return (
    <div className="flex justify-around mt-2 gap-2">
      <div className="flex flex-col gap-2 w-full">
        <label>Od</label>
        <DatePicker
          className={'w-full border border-gray-200 p-1'}
          dateFormat="yyyy-MM-dd h:mm"
          selected={formData.selectedStartDate}
          onChange={handleStartDateChange}
          locale={pl}
          showTimeInput
          timeInputLabel="Czas:"
          data-testid="start-date-picker"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>Do</label>
        <DatePicker
          className={'w-full border border-gray-200 p-1'}
          dateFormat="yyyy-MM-dd h:mm"
          selected={formData.selectedEndDate}
          onChange={handleEndDateChange}
          locale="pl"
          showTimeInput
          timeInputLabel="Czas:"
          data-testid="end-date-picker"
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
