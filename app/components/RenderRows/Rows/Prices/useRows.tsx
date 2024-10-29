import React, { useMemo } from 'react';
import useMouseEnterHandler from '../hooks/useMouseEnterHandler';
import {
  addDays,
  differenceInDays,
  isSameDay,
  isToday,
  isWeekend,
} from 'date-fns';
import useHandleButtonClick from '../hooks/useHandleButtonClick';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import useMemoizedButton from '../../../../hooks/MemoizedButton/useMemoiżedButton';
function useRows({ rooms, prices }) {
  const {
    isButtonVisible,
    handleMouseEnter,
    handleMouseLeave,
    hoveredColumnIndex,
    setHoveredColumnIndex,
    hoveredRowIndex,
    setHoveredRowIndex,
  } = useMouseEnterHandler();

  const MemoizedButton = useMemoizedButton();

  const { handleButtonClick } = useHandleButtonClick();

  const { selectedButton } = useAddReservationContext();

  const { endDate, startDate } = useCalendarContext();

  const rows = useMemo(() => {
    return rooms.map((room, roomIndex) => {
      const totalDays = differenceInDays(endDate, startDate) + 1;

      const roomPrice = prices?.find((price) =>
        price.selected_rooms.some((selectedRoom) => selectedRoom.id === room.id)
      );
      const displayPrice = roomPrice?.partial_prices[0]?.longStay || 0;

      const roomDays = Array.from({ length: totalDays }, (_, index) => {
        const currentDateIterator = addDays(startDate, index);
        const isWeekendDay = isWeekend(currentDateIterator);
        const isCurrentDay = isToday(currentDateIterator);
        const currentDateTimestamp = currentDateIterator.getTime();

        const matchingDates = roomPrice?.dates.find((date) =>
          isSameDay(new Date(date.startDate), currentDateIterator)
        );

        const duration = matchingDates
          ? differenceInDays(
              new Date(matchingDates.endDate),
              new Date(matchingDates.startDate)
            ) + 1
          : 1;

        const isWithinDateRange = matchingDates !== undefined;

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

            {isWithinDateRange &&
              duration > 0 &&
              Array.from({ length: duration }).map((_, index) => (
                <div
                  key={index}
                  className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0  text-gray-700 text-xs z-[40]"
                  style={{
                    width: '44px',
                    left: `${index * 44}px`,
                  }}
                >
                  {displayPrice}
                </div>
              ))}
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
  return { rows, hoveredColumnIndex };
}

export default useRows;
