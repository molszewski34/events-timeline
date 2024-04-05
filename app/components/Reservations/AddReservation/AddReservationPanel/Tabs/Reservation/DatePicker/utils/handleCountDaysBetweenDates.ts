import { differenceInDays } from 'date-fns';

const handleCountDaysBetweenDates = (
  startDate: Date | null,
  endDate: Date | null
): number => {
  if (!startDate || !endDate) return 0;

  const daysDifference = differenceInDays(endDate, startDate);

  return Math.abs(daysDifference);
};

export default handleCountDaysBetweenDates;
