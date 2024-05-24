'use client';

import React, { useState, useEffect } from 'react';
import {
  addDays,
  differenceInDays,
  format,
  isSameDay,
  isToday,
  isWeekend,
} from 'date-fns';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { fetchRooms } from '@/app/actions/fetchRoom';
import { fetchReservations } from '@/app/actions/fetchReservations';
import { FetchedRooms, Reservation } from './types';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
import LeftPanel from '../LeftPanel/LeftPanel';
import Button from '../Reservations/AddReservation/Button/Button';

export const RenderRows: React.FC = () => {
  const {
    currentDate,
    daysToShow,
    setDaysToShow,
    endDate,
    setEndDate,
    startDate,
    setStartDate,
  } = useCalendarContext();

  const {
    setSelectedStartDate,
    setSelectedEndDate,
    setSelectedRoomId,
    formData,
    setFormData,
    selectedButton,
    setSelectedButton,
    reservations,
    setReservations,
  } = useAddReservationContext();

  const { rooms, setRooms } = useAddRoomContext();

  const [loading, setLoading] = useState(true);

  console.log(reservations);

  useEffect(() => {
    const fetchUserRooms = async () => {
      const result = await fetchRooms();
      if (result.success) {
        setRooms(result.data || []);
      } else {
        console.error(result.error);
      }
      setLoading(false);
    };

    const fetchAllReservations = async () => {
      const result = await fetchReservations();
      if (result.success) {
        setReservations(result.data || []);
      } else {
        console.error(result.error);
      }
    };

    fetchUserRooms();
    fetchAllReservations();
  }, []);

  const dateFormat = 'EEEEEE dd';
  const days: JSX.Element[] = [];

  const handleButtonClick = (room: FetchedRooms, timestamp: number) => {
    setSelectedButton({ room, timestamp });
  };

  const handlePrevWeek = () => {
    setStartDate((prevStartDate: Date) => addDays(prevStartDate, -7));
    setEndDate((prevEndDate: Date) => addDays(prevEndDate, -7));
  };

  const handleNextWeek = () => {
    setStartDate((prevStartDate: Date) => addDays(prevStartDate, 7));
    setEndDate((prevEndDate: Date) => addDays(prevEndDate, 7));
  };

  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => handleNextWeek(),
    onSwipedRight: () => handlePrevWeek(),
    trackMouse: true,
  });

  let currentDateIterator = startDate;
  while (currentDateIterator <= endDate) {
    const words = format(currentDateIterator, dateFormat).split(' ');
    const isWeekendDay = isWeekend(currentDateIterator);
    days.push(
      <div
        key={currentDateIterator.toString()}
        className={`w-[50px] h-[50px] px-[15px] flex flex-col text-sm text-center justify-between ${
          isToday(currentDateIterator) ? 'today' : ''
        } ${isSameDay(currentDateIterator, currentDate) ? 'bg-gray-00' : ''} ${
          isWeekendDay
            ? 'bg-gray-300 border border-white border-t-2 border-t-black py-[3px] font-bold'
            : 'py-[5px]'
        }`}
        {...(currentDateIterator === currentDate
          ? { 'aria-current': 'date' }
          : {})}
      >
        <div className="text-sm" style={{ fontSize: 'small' }}>
          {words[0]}
        </div>
        <div className="text-lg" style={{ fontSize: 'large' }}>
          {words[1]}
        </div>
      </div>
    );
    currentDateIterator = addDays(currentDateIterator, 1);
  }

  const rows = rooms.map((room: FetchedRooms) => {
    const days: JSX.Element[] = [];
    currentDateIterator = startDate;

    const roomReservations = reservations.filter(
      (reservation: Reservation) => reservation.room_id === room.id
    );

    while (currentDateIterator <= endDate) {
      const currentDateTimestamp = currentDateIterator.getTime();
      let eventDuration = '';
      let eventOverlaySize = '';

      const reservation = roomReservations.find((res: Reservation) =>
        isSameDay(new Date(res.selected_start_date), currentDateIterator)
      );

      if (reservation) {
        const start = new Date(reservation.selected_start_date);
        const end = new Date(reservation.selected_end_date);
        const daysDifference = differenceInDays(end, start);
        eventDuration = `(${daysDifference + 1} dni)`;
        eventOverlaySize = `${(daysDifference + 1) * 50}px`;
      }

      days.push(
        <button
          key={`${room.id}-${currentDateIterator.toString()}`}
          className={
            ' flex flex-col flex-wrap relative w-[50px] h-[50px] bg-gray-100 border border-white '
          }
          style={{ overflow: 'visible' }}
          onMouseEnter={() => {
            handleButtonClick(room, currentDateTimestamp);
            setSelectedStartDate(currentDateTimestamp);
            setSelectedEndDate(currentDateTimestamp);
            setFormData((prevData: FormData) => ({
              ...prevData,
              numOfAdults: room.num_of_persons,
              selectedRoomId: room.id,
            }));
          }}
          onTouchStart={() => {
            handleButtonClick(room, currentDateTimestamp);
            setSelectedStartDate(currentDateTimestamp);
            setSelectedEndDate(currentDateTimestamp);
          }}
        >
          {selectedButton &&
            selectedButton.room &&
            selectedButton.room.id === room.id &&
            selectedButton.timestamp === currentDateTimestamp && <Button />}
          {reservation && (
            <span
              className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-green-500 z-50 border border-slate-50 text-gray-700 text-sm font-semibold"
              style={{ width: eventOverlaySize }}
            >
              {reservation.main_guest} {eventDuration}
            </span>
          )}
        </button>
      );
      currentDateIterator = addDays(currentDateIterator, 1);
    }

    return (
      <div key={room.id} className="flex ">
        {days}
      </div>
    );
  });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newDaysToShow = Math.floor(windowWidth / 50);
      setDaysToShow(newDaysToShow);
      setEndDate((prevEndDate: Date) => addDays(startDate, newDaysToShow));
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [startDate, setDaysToShow]);

  return (
    <div {...handlers} className="flex flex-col relative overflow-hidden">
      <LeftPanel />
      <div className="flex"> {days}</div>
      <div className="flex flex-col"> {rows}</div>
    </div>
  );
};
