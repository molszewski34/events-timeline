import { useContext, useState } from 'react';
import { useCalendarContext } from '../../../contexts/Calendar/CalendarProvider';

export const RenderYears = () => {
  // const [currentYear, setCurrentYear] = useState<number>(
  //   new Date().getFullYear()
  // );
  // const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const { currentMonth, currentYear, setCurrentYear } = useCalendarContext();
  const handleYearChange = (action: 'increment' | 'decrement') => {
    const newYear = action === 'increment' ? currentYear + 1 : currentYear - 1;
    setCurrentYear(newYear);
    const newDate = new Date(currentMonth);
    newDate.setFullYear(newYear);
  };

  return (
    <div className="year-list">
      <button onClick={() => handleYearChange('decrement')}>Prev Year</button>
      <span>{currentYear}</span>
      <button onClick={() => handleYearChange('increment')}>Next Year</button>
    </div>
  );
};
