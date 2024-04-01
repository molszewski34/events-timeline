// 'use client';
// import React, { createContext, useContext } from 'react';
// import { CalendarContextType, CalendarProviderProps } from './types';

// const defaultDate = new Date();

// export const CalendarContext = createContext<CalendarContextType>({
//   currentDate: defaultDate,
//   setCurrentDate: () => {},
//   setCurrentMonth: () => {},
//   setCurrentYear: () => {},
//   currentMonth: defaultDate,
//   currentYear: defaultDate.getFullYear(),
// });

// export const useDateContext = () => {
//   const context = useContext(CalendarContext);
//   if (!context) {
//     throw new Error('useDateContext must be used within a DateProvider');
//   }
//   return context;
// };

// export const DateProvider: React.FC<CalendarProviderProps> = ({ children }) => {
//   return (
//     <CalendarContext.Provider
//       value={{
//         currentDate: defaultDate,
//         setCurrentDate: () => {},
//         currentMonth: defaultDate,
//         setCurrentMonth: () => {},
//         currentYear: defaultDate.getFullYear(),
//         setCurrentYear: () => {},
//       }}
//     >
//       {children}
//     </CalendarContext.Provider>
//   );
// };

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
