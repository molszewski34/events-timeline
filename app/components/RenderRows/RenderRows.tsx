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
import { useSwipeable } from 'react-swipeable';
import LeftPanel from '../LeftPanel/LeftPanel';
import AddReservationBtn from '../Reservations/AddReservation/Button/AddReservationBtn';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { Database } from '@/types/supabase';
import { pl } from 'date-fns/locale';
import { usePathname } from 'next/navigation';
import SetPriceBtn from '../SetPrice/SetPriceBtn/SetPriceBtn';

export default function RenderRows({ id }: { id: string }) {
  const supabase = useSupabaseBrowser();
  const { data: reservations } = useQuery(fetchReservations(supabase, id));
  const { data: rooms } = useQuery(fetchRooms(supabase, id));
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const pathname = usePathname();

  const MemoizedButton = React.memo(
    pathname === 'calendar' ? AddReservationBtn : SetPriceBtn
  );

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

  const [hoveredColumnIndex, setHoveredColumnIndex] = useState<number | null>(
    null
  );
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date();
    const monday = startOfWeek(today, { weekStartsOn: 1 }); //
    setStartDate(monday);
    setEndDate(endOfWeek(monday, { weekStartsOn: 1 })); //
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

  const handleMouseEnter = useCallback(
    (room, timestamp) => {
      setSelectedButton({ room, timestamp });
      setIsButtonVisible(true);
    },
    [setSelectedButton]
  );

  const handleMouseLeave = useCallback(() => {
    setIsButtonVisible(false);
    setHoveredColumnIndex(null);
    setHoveredRowIndex(null);
  }, []);

  const days = useMemo(() => {
    const dayNames = ['PN', 'WT', 'ŚR', 'CZ', 'PT', 'SB', 'ND'];

    const totalDays = differenceInDays(endDate, startDate) + 1;
    return Array.from({ length: totalDays }, (_, index) => {
      const currentDateIterator = addDays(startDate, index);
      const dayOfWeek = currentDateIterator.getDay();
      const customDayName = dayNames[dayOfWeek === 0 ? 6 : dayOfWeek - 1];
      const dayNumber = format(currentDateIterator, 'd', { locale: pl });
      const isWeekendDay = isWeekend(currentDateIterator);
      const isCurrentDate = isSameDay(currentDateIterator, currentDate);

      return (
        <div
          key={currentDateIterator.toString()}
          className={`w-[44px] h-[37px] flex flex-col text-xs text-center justify-center border-collapse bg-white font-bold py-1
            ${index === 0 ? 'border-l-4 border-l-green-600' : 'border-l'}  
            ${isCurrentDate ? 'text-green-600' : ''} ${
            isWeekendDay
              ? 'bg-gray-300 border-gray-200 border-x font-bold'
              : 'border-gray-200'
          }`}
        >
          <div
            className={`text-[10px] leading-none ${
              isCurrentDate ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {customDayName}
          </div>
          <div className="text-[12px] leading-none">{dayNumber}</div>
        </div>
      );
    });
  }, [startDate, endDate, currentDate]);

  const rows = useMemo(() => {
    return rooms?.map((room, roomIndex) => {
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
        <div className="bg-white ">{rows}</div>
      </div>
    </div>
  );
}
