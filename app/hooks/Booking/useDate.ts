import { useState } from 'react';
import {
  format,
  addMonths,
  addYears,
  subMonths,
  subYears,
} from 'date-fns';

export const useDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedMonth = format(currentDate, 'MMM');
  const formattedYear = format(currentDate, 'yyyy');
  const formattedDate = format(currentDate, 'MMMM yyyy');

  const incrementMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const incrementYear = () => setCurrentDate(addYears(currentDate, 1));
  const decrementMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const decrementYear = () => setCurrentDate(subYears(currentDate, 1));

  return {
    currentDate,
    formattedMonth,
    formattedYear,
    formattedDate,
    incrementMonth,
    incrementYear,
    decrementMonth,
    decrementYear,
  };
};
