import { useContext } from 'react';
import { pl } from 'date-fns/locale';
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  isToday,
  differenceInDays,
} from 'date-fns';
import { useState } from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';

export const RenderDays = () => {
  const { currentDate, setCurrentDate } = useCalendarContext();

  const dateFormat = 'EEEEEE dd MMM';
  const days = [];
  let startDate = startOfWeek(startOfMonth(currentDate), { locale: pl });
  let endDate = endOfWeek(endOfMonth(currentDate), { locale: pl });

  while (startDate <= endDate) {
    days.push(
      <button
        key={startDate.toString()}
        className={`day-button flex flex-col w-[50px] ${
          isToday(startDate) ? 'today' : ''
        } ${isSameDay(startDate, currentDate) ? 'selected' : ''}`}
        {...(startDate === currentDate ? { 'aria-current': 'date' } : {})}
      >
        {format(startDate, dateFormat)}
      </button>
    );
    startDate = addDays(startDate, 1);
  }

  return days;
};
