'use client';

import { createContext, useContext, useState } from 'react';

const CalendarContext = createContext<any>(undefined);
export function CalendarWrapper({ children }: { children: React.ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [daysToShow, setDaysToShow] = useState(14);
  const [maxWeeksToShow, setMaxWeeksToShow] = useState(2);
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
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  return useContext(CalendarContext);
}
