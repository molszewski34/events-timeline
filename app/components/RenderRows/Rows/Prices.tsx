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
import { usePathname } from 'next/navigation';
import { Reservation, Room } from '../types';
import AddReservationBtn from '../../Reservations/AddReservation/Button/AddReservationBtn';
import SetPriceBtn from '../../SetPrice/SetPriceBtn/SetPriceBtn';
import useMouseEnterHandler from './hooks/useMouseEnterHandler';
import useHandleButtonClick from './hooks/useHandleButtonClick';
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

const Prices: React.FC<RoomRowsProps> = ({ rooms, prices }) => {
  //Providers
  const { setIsEditing, setOverlay, endDate, startDate } = useCalendarContext();
  const { selectedButton, setOpenAddReservationPanel } =
    useAddReservationContext();
  const pathname = usePathname();

  const MemoizedButton = React.memo(
    pathname === '/calendar' ? AddReservationBtn : SetPriceBtn
  );

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

      const roomPrice = prices?.find((price) =>
        price.selected_rooms.some((selectedRoom) => selectedRoom.id === room.id)
      );

      const roomDays = Array.from({ length: totalDays }, (_, index) => {
        const currentDateIterator = addDays(startDate, index);
        const isWeekendDay = isWeekend(currentDateIterator);
        const isCurrentDay = isToday(currentDateIterator);
        const currentDateTimestamp = currentDateIterator.getTime();

        const isWithinDateRange = roomPrice?.dates.some(
          (date) =>
            isSameDay(new Date(date.startDate), currentDateIterator) ||
            isSameDay(new Date(date.endDate), currentDateIterator)
        );

        const matchingDates = roomPrice?.dates.find((date) =>
          isSameDay(new Date(date.startDate), currentDateIterator)
        );

        const duration = matchingDates
          ? differenceInDays(
              new Date(matchingDates.endDate),
              new Date(matchingDates.startDate)
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
            {isWithinDateRange && (
              <div
                className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-red-300 text-gray-700 text-sm font-semibold z-[40] border border-slate-50"
                style={{
                  width: `${duration * 50}px`,
                }}
              >
                Test
              </div>
            )}
            {isButtonVisible &&
              selectedButton?.room?.id === room.id &&
              selectedButton.timestamp === currentDateTimestamp && (
                <MemoizedButton />
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
    prices,
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

export default Prices;
