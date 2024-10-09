'use client';

import React, { useEffect, useMemo } from 'react';
import { addDays, differenceInDays } from 'date-fns';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useSwipeable } from 'react-swipeable';
import LeftPanel from '../LeftPanel/LeftPanel';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import Day from './Days/Days';
import Reservations from './Rows/Reservations';
import { fetchPrices } from '@/app/actions/fetchPrices';
import { fetchReservations } from '@/app/actions/fetchReservations';
import { fetchRooms } from '@/app/actions/fetchRoom';

export default function RenderRows({ id }: { id: string }) {
  const supabase = useSupabaseBrowser();

  const { data: prices } = useQuery(fetchPrices(supabase, id));
  const { data: reservations } = useQuery(fetchReservations(supabase, id));
  const { data: rooms } = useQuery(fetchRooms(supabase, id));

  const {
    currentDate,
    setDaysToShow,
    endDate,
    setEndDate,
    startDate,
    setStartDate,
  } = useCalendarContext();

  const handlers = useSwipeable({
    onSwipedLeft: () => setStartDate((prev: Date) => addDays(prev, 7)),
    onSwipedRight: () => setStartDate((prev: Date) => addDays(prev, -7)),
    trackMouse: true,
  });

  const days = useMemo(() => {
    const totalDays = differenceInDays(endDate, startDate) + 1;
    return Array.from({ length: totalDays }, (_, index) => (
      <Day
        key={index}
        currentDate={currentDate}
        startDate={startDate}
        index={index}
      />
    ));
  }, [startDate, endDate, currentDate]);

  useEffect(() => {
    const handleResize = () => {
      const newDaysToShow = Math.floor(window.innerWidth / 50);
      setDaysToShow(newDaysToShow);
      setEndDate(addDays(startDate, newDaysToShow));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [startDate, setDaysToShow, setEndDate]);

  return (
    <div {...handlers} className="flex relative overflow-hidden">
      <LeftPanel id={id} />
      <div className="flex flex-col flex-1 relative border-collapse">
        <div className="flex border-collapse">{days}</div>
        <Reservations id={id} reservations={reservations} rooms={rooms} />
      </div>
    </div>
  );
}
