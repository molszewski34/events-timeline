import { useContext, useEffect } from 'react';
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
  isWeekend,
} from 'date-fns';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';

export const RenderDays = () => {
  const { currentDate, daysToShow, setDaysToShow } = useCalendarContext();

  const dateFormat = 'EEEEEE dd';
  const days = [];
  let startDate = startOfWeek(startOfMonth(currentDate), { locale: pl });
  let endDate = endOfWeek(endOfMonth(currentDate), { locale: pl });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newDaysToShow = Math.floor(windowWidth / 50);
      setDaysToShow(newDaysToShow);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  endDate = addDays(startDate, daysToShow);

  while (startDate <= endDate) {
    const words = format(startDate, dateFormat).split(' ');
    const isWeekendDay = isWeekend(startDate);
    days.push(
      <div
        key={startDate.toString()}
        className={`w-[50px] h-[50px] px-[15px] flex flex-col text-sm text-center justify-between ${
          isToday(startDate) ? 'today' : ''
        } ${isSameDay(startDate, currentDate) ? 'bg-gray-00' : ''} ${
          isWeekendDay
            ? 'bg-gray-300 border border-white border-t-2 border-t-black py-[3px] font-bold'
            : 'py-[5px]'
        }`}
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
