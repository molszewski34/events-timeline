'use client';
import React, { useMemo } from 'react';
import {
  addDays,
  differenceInDays,
  isSameDay,
  isToday,
  isWeekend,
} from 'date-fns';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { Reservation, Room } from '../types';
import useMouseEnterHandler from './hooks/useMouseEnterHandler';
import useHandleButtonClick from './hooks/useHandleButtonClick';
import useMemoizedButton from '@/app/hooks/MemoizedButton/useMemoiżedButton';
interface RoomRowsProps {
  rooms: Room[];
  reservations: Reservation[];
  startDate: Date;
  endDate: Date;
  currentDate: Date;
  isButtonVisible: boolean;
  handleButtonClick: (room: Room, timestamp: number) => void;
  handleMouseEnter: (room: Room, timestamp: number) => void;
  handleMouseLeave: () => void;
  hoveredColumnIndex: number | null;
  hoveredRowIndex: number | null;
  setHoveredColumnIndex: (index: number | null) => void;
  setHoveredRowIndex: (index: number | null) => void;
  MemoizedButton: React.MemoExoticComponent<React.FC>;
}

const Reservations: React.FC<RoomRowsProps> = ({ rooms, reservations }) => {
  //Providers
  const { setIsEditing, setOverlay, endDate, startDate } = useCalendarContext();
  const { selectedButton, setOpenAddReservationPanel } =
    useAddReservationContext();

  const MemoizedButton = useMemoizedButton();

  //Hooks
  const {
    isButtonVisible,
    handleMouseEnter,
    handleMouseLeave,
    hoveredColumnIndex,
    setHoveredColumnIndex,
    hoveredRowIndex,
    setHoveredRowIndex,
  } = useMouseEnterHandler();

  const { handleButtonClick } = useHandleButtonClick();

  const rows = useMemo(() => {
    return rooms.map((room, roomIndex) => {
      const totalDays = differenceInDays(endDate, startDate) + 1;
      const roomReservations = reservations?.filter(
        (res) => res.room_id === room.id
      );

      const roomDays = Array.from({ length: totalDays }, (_, index) => {
        const currentDateIterator = addDays(startDate, index);
        const isWeekendDay = isWeekend(currentDateIterator);
        const isCurrentDay = isToday(currentDateIterator);
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
            className={`flex flex-col flex-wrap relative w-[44px] h-[48px] 
              ${index === 0 ? 'border-l border-t' : 'border-t border-l'} 
              border-gray-200 ${isWeekendDay ? 'bg-[#ebedef]' : ''} ${
              isCurrentDay ? 'bg-[#d9f2e3]' : ''
            }`}
            onMouseEnter={() => {
              handleMouseEnter(room, currentDateTimestamp);
              setHoveredColumnIndex(index);
              setHoveredRowIndex(roomIndex);
            }}
            onTouchStart={() => handleButtonClick(room, currentDateTimestamp)}
            onMouseLeave={handleMouseLeave}
          >
            {isButtonVisible &&
              selectedButton?.room?.id === room.id &&
              selectedButton.timestamp === currentDateTimestamp && (
                <MemoizedButton />
              )}

            {reservation && (
              <button
                className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-red-300 text-gray-700 text-sm font-semibold z-[40] border border-slate-50"
                style={{
                  width: `${duration * 50}px`,
                  backgroundColor: reservation.selected_status?.color,
                }}
                onClick={() => {
                  setIsEditing(true);
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
        <div key={room.id} className="flex relative">
          {hoveredColumnIndex !== null && hoveredRowIndex === roomIndex && (
            <div
              className="absolute inset-0 bg-black opacity-10 pointer-events-none"
              style={{
                zIndex: 10,
              }}
            />
          )}
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
    hoveredColumnIndex,
    hoveredRowIndex,
    handleMouseEnter,
    handleMouseLeave,
    isButtonVisible,
    MemoizedButton,
  ]);

  return (
    <>
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
      <>{rows}</>
    </>
  );
};

export default Reservations;
