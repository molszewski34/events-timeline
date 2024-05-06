'use client';
import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import { addDays } from 'date-fns';
import { RenderRows } from '../components/RenderRows/RenderRows';
import { RenderMonths } from '../components/TopPanel/RenderMonths/RenderMonths';
import { RenderYears } from '../components/TopPanel/RenderYears/RenderYears';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import LeftPanel from '../components/LeftPanel/LeftPanel';
import AddReservationPanel from '../components/Reservations/AddReservation/AddReservationPanel/AddReservationPanel';
import NavDesktop from '../components/Navigation/desktop/NavDesktop';
import NavMobile from '../components/Navigation/mobile/NavMobile';
import Footer from '../components/Footer/Footer';
const Calendar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const { currentDate, setCurrentDate } = useCalendarContext();
  const { openAddReservationPanel, setOpenAddReservationPanel } =
    useAddReservationContext();

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    updateContainerWidth();

    window.addEventListener('resize', updateContainerWidth);

    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, [containerRef]);

  return (
    <div className="calendar overflow-hidden" ref={containerRef}>
      {containerWidth && containerWidth >= 768 && (
        <div className="">
          <NavDesktop />
        </div>
      )}
      {containerWidth && containerWidth <= 768 && (
        <div className="">
          <NavMobile />
        </div>
      )}
      <div className="flex">
        <div className="flex flex-col">
          <RenderRows />
        </div>
      </div>
      <Footer />
      {openAddReservationPanel && <AddReservationPanel />}
    </div>
  );
};

export default Calendar;
