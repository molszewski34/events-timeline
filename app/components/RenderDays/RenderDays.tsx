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

  const dateFormat = 'EEEEEE dd';
  const days = [];
  let startDate = startOfWeek(startOfMonth(currentDate), { locale: pl });
  let endDate = endOfWeek(endOfMonth(currentDate), { locale: pl });

  while (startDate <= endDate) {
    const words = format(startDate, dateFormat).split(' ');
    days.push(
      <div
        key={startDate.toString()}
        className={`btn flex flex-col text-sm text-center ${
          isToday(startDate) ? 'today' : ''
        } ${isSameDay(startDate, currentDate) ? 'selected' : ''}`}
        {...(startDate === currentDate ? { 'aria-current': 'date' } : {})}
      >
        <div className="text-sm" style={{ fontSize: 'small' }}>
          {words[0]}
        </div>
        <div className="text-lg" style={{ fontSize: 'large' }}>
          {words[1]}
        </div>
      </div>
    );
    startDate = addDays(startDate, 1);
  }

  return days;
};
