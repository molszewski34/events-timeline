'use client';
import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { format } from 'date-fns';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import pl from 'date-fns/locale/pl';
import handleCountDaysBetweenDates from './utils/handleCountDaysBetweenDates'; // importuj funkcję zliczającą dni

const DatePicker = () => {
  const {
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    setDaysBetween,
  } = useAddReservationContext();
  const formattedDate = format(new Date(selectedStartDate), 'yyyy-MM-dd h:mm');

  React.useEffect(() => {
    const days = handleCountDaysBetweenDates(
      selectedStartDate,
      selectedEndDate
    );
    setDaysBetween(days);
  }, [selectedStartDate, selectedEndDate]);

  return (
    <div className=" flex flex-col gap-2 mt-2">
      <div className="flex gap-2">
        <h2>Od:</h2>
        <DateTimePicker
          className={'w-20'}
          format="yyyy-MM-dd h:mm"
          clearIcon={null}
          value={formattedDate}
          onChange={(date: Date | null) => setSelectedStartDate(date)}
          locale="pl"
        />
      </div>
      <div className="flex gap-2">
        <h2>Do:</h2>
        <DateTimePicker
          className={'w-20'}
          format="yyyy-MM-dd h:mm"
          clearIcon={null}
          value={selectedEndDate}
          onChange={(date: Date | null) => setSelectedEndDate(date)}
          locale="pl"
        />
      </div>
      {/* <div>Ilość dni między datami: {daysBetween}</div> */}
    </div>
  );
};

export default DatePicker;
