'use client';
import React, { useState, useRef, useEffect, useContext } from 'react';
import './index.css';
import { addDays } from 'date-fns';
import { RenderDays } from '../components/RenderDays/RenderDays';
import { RenderRows } from '../components/RenderRows/RenderRows';
import { RenderMonths } from '../components/TopPanel/RenderMonths/RenderMonths';
import { RenderYears } from '../components/TopPanel/RenderYears/RenderYears';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
const Calendar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const { currentDate, setCurrentDate } = useCalendarContext();

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
    }
  }, [containerRef]);

  console.log(currentDate);

  return (
    <div className="calendar">
      <div className="header flex items-center justify-around">
        <button onClick={() => setCurrentDate(addDays(currentDate, -7))}>
          Poprzedni tydzień
        </button>
        <div className="month-list">
          <RenderMonths />
        </div>
        <button onClick={() => setCurrentDate(addDays(currentDate, 7))}>
          Następny tydzień
        </button>
      </div>
      <RenderYears />
      <div className="flex">
        <RenderDays />
      </div>
      <div className="flex flex-col">
        <RenderRows />
      </div>
    </div>
  );
};

export default Calendar;
