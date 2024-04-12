'use client';
import React, { useState, useRef, useEffect, useContext } from 'react';
import './index.css';
import { addDays } from 'date-fns';
import { RenderRows } from '../components/RenderRows/RenderRows';
import { RenderMonths } from '../components/TopPanel/RenderMonths/RenderMonths';
import { RenderYears } from '../components/TopPanel/RenderYears/RenderYears';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import LeftPanel from '../components/LeftPanel/LeftPanel';
import AddReservationPanel from '../components/Reservations/AddReservation/AddReservationPanel/AddReservationPanel';
const Calendar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const { currentDate, setCurrentDate } = useCalendarContext();
  const { openAddReservationPanel, setOpenAddReservationPanel } =
    useAddReservationContext();
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
    }
  }, [containerRef]);

  return (
    <div className="calendar overflow-hidden">
      <div className="header flex flex-col items-center gap-4  bg-slate-100 px-2">
        <div className="flex items-center gap-4">
          <RenderYears />
          <button
            className="material-icon text-gray-700 bg-gray-300 w-5 h-5 flex items-center justify-center text-xs rounded-sm"
            onClick={() => setCurrentDate(addDays(currentDate, -7))}
          >
            arrow_back_ios
          </button>
          <span className="text-sm">Tydzień</span>
          <button
            className="material-icon text-gray-700 bg-gray-300 w-5 h-5 flex items-center justify-center text-xs rounded-sm"
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
          >
            arrow_forward_ios
          </button>
        </div>
        <div className="month-list">
          <RenderMonths />
        </div>
      </div>
      <div className="relative flex">
        <LeftPanel />
        <div className="flex flex-col">
          <RenderRows />
        </div>
      </div>
      {openAddReservationPanel && <AddReservationPanel />}
    </div>
  );
};

export default Calendar;
