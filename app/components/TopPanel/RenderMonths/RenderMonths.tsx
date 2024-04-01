import { useContext, useState } from 'react';
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
import { pl } from 'date-fns/locale';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';

export const RenderMonths = () => {
  const { currentDate, setCurrentDate, currentMonth } = useCalendarContext();
  // const [currentDate, setCurrentDate] = useState<Date>(new Date());
  // const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const months: JSX.Element[] = [];
  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(currentDate.getFullYear(), i, 1);
    months.push(
      <button
        key={monthDate.toString()}
        onClick={() => setCurrentDate(monthDate)}
        className={`month-button ${
          isSameMonth(monthDate, currentMonth) ? 'current-month' : ''
        }`}
      >
        {format(monthDate, 'MMM', { locale: pl })}
      </button>
    );
  }
  return months;
};
