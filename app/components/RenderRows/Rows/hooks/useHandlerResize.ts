import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { addDays } from 'date-fns';
import { useEffect, useCallback } from 'react';

export default function useHandlerResize() {
  const { setDaysToShow, setEndDate, startDate } = useCalendarContext();

  
  const handleResize = useCallback(() => {
    const newDaysToShow = Math.floor(window.innerWidth / 50);
    setDaysToShow(newDaysToShow);
    setEndDate(addDays(startDate, newDaysToShow));
  }, [startDate, setDaysToShow, setEndDate]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  
  return { handleResize };
}
