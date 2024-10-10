import React, { useMemo } from 'react';
import { differenceInDays, addDays } from 'date-fns';
import Day from './Day';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';

interface DaysProps {
  currentDate: Date;
  startDate: Date;
}

const Days: React.FC<DaysProps> = ({ currentDate, startDate }) => {
  const { endDate } = useCalendarContext();

  const days = useMemo(() => {
    const totalDays = differenceInDays(endDate, startDate) + 1;
    return Array.from({ length: totalDays }, (_, index) => (
      <Day
        key={index}
        currentDate={currentDate}
        startDate={startDate}
        index={index}
      />
    ));
  }, [startDate, endDate, currentDate]);

  return <>{days}</>;
};

export default Days;
