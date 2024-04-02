'use client';
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isToday,
  differenceInDays,
} from 'date-fns';
import { pl } from 'date-fns/locale';

import { rooms } from '@/app/data/roomsData';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
export const RenderRows = () => {
  const { currentDate, setCurrentDate } = useCalendarContext();
  const dateFormat = 'EEEEEE dd';
  const rows = rooms.map((room) => {
    const days: JSX.Element[] = [];
    let startDate = startOfWeek(startOfMonth(currentDate), { locale: pl });
    let endDate = endOfWeek(endOfMonth(currentDate), { locale: pl });

    const roomEventStartDates = room.events.map((event) =>
      new Date(event.start).setHours(0, 0, 0, 0)
    );
    const roomEventEndDates = room.events.map((event) =>
      new Date(event.end).setHours(0, 0, 0, 0)
    );

    while (startDate <= endDate) {
      const currentDateTimestamp = startDate.getTime();
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
        console.log(eventOverlaySize);
      }

      days.push(
        <button
          key={startDate.toString()}
          className={` flex flex-col flex-wrap relative w-[50px] h-[50px] bg-gray-100 border border-white ${
            isToday(startDate) ? 'today' : ''
          } ${isSameDay(startDate, currentDate) ? 'selected' : ''} ${
            roomEventStartDates.includes(currentDateTimestamp)
              ? 'event-start-date'
              : ''
          }`}
          style={{ overflow: 'visible' }}
        >
          {roomEventStartDates.includes(currentDateTimestamp) && (
            <>
              <span
                className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-green-400 z-50 border border-slate-50 text-gray-700 text-sm font-semibold"
                style={{ width: eventOverlaySize }}
              >
                {room.events[eventIndex].title}
              </span>
            </>
          )}
        </button>
      );
      startDate = addDays(startDate, 1);
    }

    return (
      <div key={room.roomName} className="room-row flex">
        {days}
      </div>
    );
  });

  return rows;
};
