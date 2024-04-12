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

export const RenderRows = () => {
  const { currentDate, daysToShow, setDaysToShow } = useCalendarContext();
  const { setSelectedStartDate, setSelectedEndDate } =
    useAddReservationContext();
  // const dateFormat = 'EEEEEE dd';

  const [startDate, setStartDate] = useState<Date>(
    startOfWeek(startOfMonth(currentDate), { locale: pl })
  );

  const dateFormat = 'EEEEEE dd';
  const days: JSX.Element[] = [];

  let endDate: Date = addDays(startDate, daysToShow);
  let currentDateIterator = startDate;

  const [selectedButton, setSelectedButton] = useState<{
    room: Room | null;
    timestamp: number | null;
  }>({ room: null, timestamp: null });

  const handleButtonClick = (room: Room, timestamp: number) => {
    setSelectedButton({ room, timestamp });
  };

  const handlePrevWeek = () => {
    setStartDate((prevStartDate) => addDays(prevStartDate, -7));
  };

  const handleNextWeek = () => {
    setStartDate((prevStartDate) => addDays(prevStartDate, 7));
  };

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

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newDaysToShow = Math.floor(windowWidth / 50);
      setDaysToShow(newDaysToShow);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const rows = rooms.map((room: Room) => {
    const days: JSX.Element[] = [];
    console.log(currentDateIterator);
    // let startDate = startOfWeek(startOfMonth(currentDate), { locale: pl });
    let endDate = endOfWeek(endOfMonth(currentDate), { locale: pl });

    const roomEventStartDates = room.events.map((event) =>
      new Date(event.start).setHours(0, 0, 0, 0)
    );
    const roomEventEndDates = room.events.map((event) =>
      new Date(event.end).setHours(0, 0, 0, 0)
    );

    endDate = addDays(currentDateIterator, daysToShow);

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
        // console.log(eventOverlaySize);
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

  return (
    <div className="flex flex-col">
      <>
        <button onClick={handlePrevWeek}>Poprzedni tydzień</button>
        <button onClick={handleNextWeek}>Następny tydzień</button>
      </>
      <div className="flex"> {days}</div>
      <div className="flex flex-col"> {rows}</div>
    </div>
  );
};
