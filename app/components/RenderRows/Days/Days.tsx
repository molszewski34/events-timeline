// Day.tsx
import React from 'react';
import { format, isWeekend, isSameDay } from 'date-fns';
import { pl } from 'date-fns/locale';
import { addDays } from 'date-fns';
interface DayProps {
  currentDate: Date;
  startDate: Date;
  index: number;
}

const Day: React.FC<DayProps> = ({ currentDate, startDate, index }) => {
  const dayNames = ['PN', 'WT', 'ŚR', 'CZ', 'PT', 'SB', 'ND'];

  const currentDateIterator = addDays(startDate, index);
  const dayOfWeek = currentDateIterator.getDay();
  const customDayName = dayNames[dayOfWeek === 0 ? 6 : dayOfWeek - 1];
  const dayNumber = format(currentDateIterator, 'd', { locale: pl });
  const isWeekendDay = isWeekend(currentDateIterator);
  const isCurrentDate = isSameDay(currentDateIterator, currentDate);

  return (
    <div
      key={currentDateIterator.toString()}
      className={`w-[44px] h-[37px] flex flex-col text-xs text-center justify-center border-collapse bg-white font-bold py-1
        ${index === 0 ? 'border-l-4 border-l-green-600' : 'border-l'}
        ${isCurrentDate ? 'text-green-600' : ''} ${
        isWeekendDay
          ? 'bg-gray-300 border-gray-200 border-x font-bold'
          : 'border-gray-200'
      }`}
    >
      <div
        className={`text-[10px] leading-none ${
          isCurrentDate ? 'text-green-600' : 'text-gray-500'
        }`}
      >
        {customDayName}
      </div>
      <div className="text-[12px] leading-none">{dayNumber}</div>
    </div>
  );
};

export default Day;
