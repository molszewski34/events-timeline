'use client';

import { createContext, useContext, useState } from 'react';

const CalendarContext = createContext<any>(undefined);
export function CalendarWrapper({ children }: { children: React.ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  return useContext(CalendarContext);
}
