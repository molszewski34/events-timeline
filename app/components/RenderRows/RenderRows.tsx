// @ts-nocheck

'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  addDays,
  differenceInDays,
  format,
  isSameDay,
  isToday,
  isWeekend,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { fetchRooms } from '@/app/actions/fetchRoom';
import { fetchReservations } from '@/app/actions/fetchReservations';
import { FormData } from '@/app/contexts/AddReservation/types';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
import LeftPanel from '../LeftPanel/LeftPanel';
import Button from '../Reservations/AddReservation/Button/Button';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { Database } from '@/types/supabase';

// Memoized Button Component
const MemoizedButton = React.memo(Button);

export default function RenderRows({ id }: { id: string }) {
  const supabase = useSupabaseBrowser();
  const { data: reservations } = useQuery(fetchReservations(supabase, id));
  const { data: rooms } = useQuery(fetchRooms(supabase, id));

  const {
    currentDate,
    daysToShow,
    setDaysToShow,
    endDate,
    setEndDate,
    startDate,
    setStartDate,
    isEditing,
    setIsEditing,
    setOverlay,
  } = useCalendarContext();

  const {
    setSelectedStartDate,
    setSelectedEndDate,
    setSelectedRoomId,
    formData,
    setFormData,
    selectedButton,
    setSelectedButton,
    setOpenAddReservationPanel,
  } = useAddReservationContext();

  const { setFetchedRooms } = useAddRoomContext();
  const originalFormDataRef = useRef<FormData | null>(null);

  useEffect(() => {
    const today = new Date();
    setStartDate(startOfWeek(today));
    setEndDate(endOfWeek(today));
  }, [setStartDate, setEndDate]);

  const dateFormat = 'EEEEEE dd';

  const handleButtonClick = useCallback(
    (room, timestamp) => {
      setSelectedButton({ room, timestamp });
    },
    [setSelectedButton]
  );

  const handlePrevWeek = useCallback(() => {
    setStartDate((prev) => addDays(prev, -7));
    setEndDate((prev) => addDays(prev, -7));
  }, [setStartDate, setEndDate]);

  const handleNextWeek = useCallback(() => {
    setStartDate((prev) => addDays(prev, 7));
    setEndDate((prev) => addDays(prev, 7));
  }, [setStartDate, setEndDate]);

  const handlers = useSwipeable({
    onSwipedLeft: handleNextWeek,
    onSwipedRight: handlePrevWeek,
    trackMouse: true,
  });

  const handleSetFormData = useCallback(
    (reservation) => {
      setFormData((prevData) => ({
        ...prevData,
        ...reservation,
      }));
    },
    [setFormData]
  );

  useEffect(() => {
    if (isEditing && selectedButton?.room) {
      if (!originalFormDataRef.current) {
        originalFormDataRef.current = formData;
      }

      const reservation = reservations?.find(
        (res) =>
          res.room_id === selectedButton.room.id &&
          isSameDay(
            new Date(res.selected_start_date),
            new Date(selectedButton.timestamp)
          )
      );

      if (reservation) {
        handleSetFormData(reservation);
      }
    } else if (!isEditing && originalFormDataRef.current) {
      setFormData(originalFormDataRef.current);
      originalFormDataRef.current = null;
    }
  }, [isEditing, selectedButton, reservations, formData, handleSetFormData]);

  const days = useMemo(() => {
    const totalDays = differenceInDays(endDate, startDate) + 1;
    return Array.from({ length: totalDays }, (_, index) => {
      const currentDateIterator = addDays(startDate, index);
      const formattedDate = format(currentDateIterator, dateFormat).split(' ');
      const isWeekendDay = isWeekend(currentDateIterator);
      const isCurrentDate = isSameDay(currentDateIterator, currentDate);

      return (
        <div
          key={currentDateIterator.toString()}
          className={`w-[50px] h-[50px] px-[15px] flex flex-col text-sm text-center justify-between ${
            isToday(currentDateIterator) ? 'today' : ''
          } ${isCurrentDate ? 'bg-gray-00' : ''} ${
            isWeekendDay
              ? 'bg-gray-300 border border-white border-t-2 border-t-black py-[3px] font-bold'
              : 'py-[5px]'
          }`}
          aria-current={isCurrentDate ? 'date' : undefined}
        >
          <div className="text-sm">{formattedDate[0]}</div>
          <div className="text-lg">{formattedDate[1]}</div>
        </div>
      );
    });
  }, [startDate, endDate, currentDate]);

  const rows = useMemo(() => {
    return rooms?.map((room) => {
      const totalDays = differenceInDays(endDate, startDate) + 1;
      const roomReservations = reservations?.filter(
        (res) => res.room_id === room.id
      );

      const roomDays = Array.from({ length: totalDays }, (_, index) => {
        const currentDateIterator = addDays(startDate, index);
        const currentDateTimestamp = currentDateIterator.getTime();
        let reservation = roomReservations?.find((res) =>
          isSameDay(new Date(res.selected_start_date), currentDateIterator)
        );
        const duration = reservation
          ? differenceInDays(
              new Date(reservation.selected_end_date),
              new Date(reservation.selected_start_date)
            ) + 1
          : 1;

        return (
          <span
            key={`${room.id}-${currentDateIterator.toString()}`}
            className="flex flex-col flex-wrap relative w-[50px] h-[50px] bg-gray-100 border border-white"
            style={{ overflow: 'visible' }}
            onMouseEnter={() => handleButtonClick(room, currentDateTimestamp)}
            onTouchStart={() => handleButtonClick(room, currentDateTimestamp)}
          >
            {selectedButton?.room?.id === room.id &&
              selectedButton.timestamp === currentDateTimestamp && (
                <MemoizedButton />
              )}

            {reservation && (
              <button
                className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-red-300 border border-slate-50 text-gray-700 text-sm font-semibold z-[40]"
                style={{
                  width: `${duration * 50}px`,
                  backgroundColor: reservation.selected_status?.color,
                }}
                onClick={() => {
                  setIsEditing?.(true);
                  setOpenAddReservationPanel(true);
                  setOverlay(true);
                }}
              >
                {duration < 3
                  ? reservation.main_guest
                      .match(/(\b\S)?/g)
                      .join('')
                      .toUpperCase()
                  : reservation.main_guest || 'Brak Nazwy'}
              </button>
            )}
          </span>
        );
      });

      return (
        <div key={room.id} className="flex">
          {roomDays}
        </div>
      );
    });
  }, [
    rooms,
    reservations,
    startDate,
    endDate,
    selectedButton,
    handleButtonClick,
    setIsEditing,
    setOpenAddReservationPanel,
    setOverlay,
  ]);

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
    <div {...handlers} className="flex flex-col relative overflow-hidden">
      <LeftPanel id={id} />
      <div className="flex">{days}</div>
      <div className="flex flex-col">{rows}</div>
    </div>
  );
}
