'use client';

import { createContext, useContext, useState } from 'react';
import { addDays, startOfWeek, startOfMonth } from 'date-fns';
import { pl } from 'date-fns/locale';

const CalendarContext = createContext<any>(undefined);
export function CalendarWrapper({ children }: { children: React.ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [daysToShow, setDaysToShow] = useState(14);
  const [maxWeeksToShow, setMaxWeeksToShow] = useState(2);
  const [startDate, setStartDate] = useState<Date>(
    startOfWeek(startOfMonth(currentDate), { locale: pl })
  );
  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        daysToShow,
        setDaysToShow,
        maxWeeksToShow,
        setMaxWeeksToShow,
        startDate,
        setStartDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  return useContext(CalendarContext);
}
