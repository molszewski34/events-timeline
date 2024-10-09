'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { addDays, differenceInDays } from 'date-fns';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { fetchRooms } from '@/app/actions/fetchRoom';
import { fetchReservations } from '@/app/actions/fetchReservations';
import { useSwipeable } from 'react-swipeable';
import LeftPanel from '../LeftPanel/LeftPanel';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { usePathname } from 'next/navigation';
import SetPriceBtn from '../SetPrice/SetPriceBtn/SetPriceBtn';
import AddReservationBtn from '../Reservations/AddReservation/Button/AddReservationBtn';

import Day from './Days/Days';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { FormData } from '@/app/contexts/AddReservation/types';
import { Room } from './types';
import Reservations from './Rows/Reservations';
import { fetchPrices } from '@/app/actions/fetchPrices';
import Prices from './Rows/Prices';
export default function RenderRows({ id }: { id: string }) {
  const supabase = useSupabaseBrowser();
  const { data: reservations } = useQuery(fetchReservations(supabase, id));
  const { data: rooms } = useQuery(fetchRooms(supabase, id));
  const { data: prices } = useQuery(fetchPrices(supabase, id));

  // console.log(prices);

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const pathname = usePathname();

  const MemoizedButton = React.memo(
    pathname === '/calendar' ? AddReservationBtn : SetPriceBtn
  );

  const {
    currentDate,
    daysToShow,
    setDaysToShow,
    endDate,
    setEndDate,
    startDate,
    setStartDate,
  } = useCalendarContext();

  const { setFormData, setSelectedButton } = useAddReservationContext();
  const { setPriceFormData } = useSetPriceContext();
  const { setFetchedRooms } = useAddRoomContext();

  const [hoveredColumnIndex, setHoveredColumnIndex] = useState<number | null>(
    null
  );
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback(
    (room: Room, timestamp: number) => {
      setSelectedButton({ room, timestamp });
      setIsButtonVisible(true);
      setFormData((prevData: FormData) => ({
        ...prevData,
        currentDateTimestamp: timestamp,
      }));
      setPriceFormData((prevData: FormData) => ({
        ...prevData,
        currentDateTimestamp: timestamp,
        room: room,
      }));
    },
    [setSelectedButton]
  );

  const handleButtonClick = useCallback(
    (room: Room, timestamp: number) => {
      setSelectedButton({ room, timestamp });
    },
    [setSelectedButton]
  );

  const handleMouseLeave = useCallback(() => {
    setIsButtonVisible(false);
    setHoveredColumnIndex(null);
    setHoveredRowIndex(null);
  }, []);

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
    if (rooms) {
      setFetchedRooms(rooms);
    }
  }, [rooms, setFetchedRooms]);

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
        {hoveredColumnIndex !== null && (
          <div
            className="absolute bg-black opacity-10 pointer-events-none"
            style={{
              width: '44px',
              height: `${(rooms?.length + 1) * 44}px`,
              top: '37px',
              left: `${hoveredColumnIndex * 44}px`,
              zIndex: 10,
            }}
          />
        )}
        {pathname === '/calendar' && (
          <Reservations
            rooms={rooms}
            reservations={reservations}
            startDate={startDate}
            endDate={endDate}
            currentDate={currentDate}
            isButtonVisible={isButtonVisible}
            handleButtonClick={handleButtonClick}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            hoveredColumnIndex={hoveredColumnIndex}
            hoveredRowIndex={hoveredRowIndex}
            setHoveredColumnIndex={setHoveredColumnIndex}
            setHoveredRowIndex={setHoveredRowIndex}
            MemoizedButton={MemoizedButton}
          />
        )}
        {pathname === '/price/set' && (
          <Prices
            rooms={rooms}
            prices={prices}
            startDate={startDate}
            endDate={endDate}
            currentDate={currentDate}
            isButtonVisible={isButtonVisible}
            handleButtonClick={handleButtonClick}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            hoveredColumnIndex={hoveredColumnIndex}
            hoveredRowIndex={hoveredRowIndex}
            setHoveredColumnIndex={setHoveredColumnIndex}
            setHoveredRowIndex={setHoveredRowIndex}
            MemoizedButton={MemoizedButton}
          />
        )}
      </div>
    </div>
  );
}
