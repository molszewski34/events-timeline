import React, { useState, useEffect } from 'react';
import {
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  differenceInDays,
  format,
  isWeekend,
  isToday,
  isSameDay,
} from 'date-fns';
import { pl } from 'date-fns/locale';
import { Room } from './types';
import { rooms } from '@/app/data/roomsData';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import Button from '../Reservations/AddReservation/Button/Button';
import { useSwipeable } from 'react-swipeable';
import LeftPanel from '../LeftPanel/LeftPanel';

export const RenderRows = () => {
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
    setFormData,
    selectedButton,
    setSelectedButton,
  } = useAddReservationContext();

  const dateFormat = 'EEEEEE dd';
  const days: JSX.Element[] = [];

  const handleButtonClick = (room: Room, timestamp: number) => {
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

  const handlers = useSwipeable({
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
  const rows = rooms.map((room: Room) => {
    const days: JSX.Element[] = [];
    currentDateIterator = startDate;

    const roomEventStartDates = room.events.map((event) =>
      new Date(event.start).setHours(0, 0, 0, 0)
    );
    const roomEventEndDates = room.events.map((event) =>
      new Date(event.end).setHours(0, 0, 0, 0)
    );

    while (currentDateIterator <= endDate) {
      const currentDateTimestamp = currentDateIterator.getTime();
      let eventDuration = '';
      let eventOverlaySize = '';

      const eventIndex = roomEventStartDates.findIndex(
        (date) => date === currentDateTimestamp
      );

      if (eventIndex !== -1) {
        const start = new Date(room.events[eventIndex].start);
        const end = new Date(room.events[eventIndex].end);
        const daysDifference = differenceInDays(end, start);
        eventDuration = `(${daysDifference} dni)`;
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
            setSelectedRoomId(room.id);
            setFormData((prevData: FormData) => ({
              ...prevData,
              numOfAdults: room.roomGuests,
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
          {roomEventStartDates.includes(currentDateTimestamp) && (
            <>
              <span
                className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-green-500 z-50 border border-slate-50 text-gray-700 text-sm font-semibold"
                style={{ width: eventOverlaySize }}
              >
                {room.events[eventIndex].title}
              </span>
            </>
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
