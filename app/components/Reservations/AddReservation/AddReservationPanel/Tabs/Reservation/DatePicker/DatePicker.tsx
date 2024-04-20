import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { format } from 'date-fns';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import pl from 'date-fns/locale/pl';
import handleCountDaysBetweenDates from './utils/handleCountDaysBetweenDates';

const DatePicker: React.FC = () => {
  const {
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    setDaysBetween,
    formData,
    setFormData,
  } = useAddReservationContext();

  const formattedStartDate = format(
    formData.selectedStartDate,
    'yyyy-MM-dd h:mm'
  );

  useEffect(() => {
    const days = handleCountDaysBetweenDates(
      formData.selectedStartDate,
      formData.selectedEndDate
    );
    setDaysBetween(days);
  }, [
    formData.selectedStartDate,
    formData.selectedEndDate,
    setDaysBetween,
    selectedStartDate,
    selectedEndDate,
  ]);

  const handleStartDateChange = (date: Date | Date[] | null) => {
    if (date instanceof Date) {
      setFormData((prevData: Date) => ({
        ...prevData,
        selectedStartDate: date,
      }));
      setSelectedStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date | Date[] | null) => {
    if (date instanceof Date) {
      setFormData((prevData: Date) => ({
        ...prevData,
        selectedEndDate: date,
      }));
      setSelectedEndDate(date);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex gap-2">
        <label>Od:</label>
        <DateTimePicker
          className={'w-20'}
          format="yyyy-MM-dd h:mm"
          clearIcon={null}
          value={formattedStartDate}
          onChange={handleStartDateChange}
          locale="pl"
          data-testid="start-date-picker"
        />
      </div>
      <div className="flex gap-2">
        <label>Do:</label>
        <DateTimePicker
          className={'w-20'}
          format="yyyy-MM-dd h:mm"
          clearIcon={null}
          value={formData.selectedEndDate}
          onChange={handleEndDateChange}
          locale="pl"
          data-testid="end-date-picker"
        />
      </div>
    </div>
  );
};

export default DatePicker;
