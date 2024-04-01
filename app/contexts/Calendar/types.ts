import { ReactNode } from 'react';

export interface CalendarContextType {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
}
export interface CalendarProviderProps {
  children: ReactNode;
}
