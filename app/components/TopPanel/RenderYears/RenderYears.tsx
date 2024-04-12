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
    <div className="year-list flex items-center gap-4">
      <button
        className="material-icon text-gray-700 bg-gray-300 w-5 h-5 flex items-center justify-center text-xs rounded-sm"
        onClick={() => handleYearChange('decrement')}
      >
        arrow_back_ios
      </button>
      <span className="text-sm">{currentYear}</span>
      <button
        className="material-icon text-gray-700 bg-gray-300 w-5 h-5 flex items-center justify-center text-xs rounded-sm"
        onClick={() => handleYearChange('increment')}
      >
        arrow_forward_ios
      </button>
    </div>
  );
};
