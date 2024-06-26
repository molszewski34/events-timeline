'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { FetchedRooms, Reservation } from './types';
import { FormData } from '@/app/contexts/AddReservation/types';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
import LeftPanel from '../LeftPanel/LeftPanel';
import Button from '../Reservations/AddReservation/Button/Button';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { Database } from '@/types/supabase';

export default function RenderRows({ id }: { id: string }) {
  const supabase = useSupabaseBrowser();
  const { data: reservations } = useQuery(fetchReservations(supabase, id));
  type Reservation = Database['public']['Tables']['reservations']['Row'];
  const { data: rooms } = useQuery(fetchRooms(supabase, id));
  type Room = Database['public']['Tables']['rooms']['Row'];
  // const { data: rooms } = useQuery(fetchRooms(supabase, id));
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
    fetchedReservations,
    setFetchedReservations,
    setOpenAddReservationPanel,
  } = useAddReservationContext();

  const { fetchedRooms, setFetchedRooms } = useAddRoomContext();

  const [loading, setLoading] = useState(true);
  const originalFormDataRef = useRef<FormData | null>(null);

  useEffect(() => {
    const today = new Date();
    const startOfWeekDate = startOfWeek(today);
    const endOfWeekDate = endOfWeek(today);
    setStartDate(startOfWeekDate);
    setEndDate(endOfWeekDate);
  }, []);

  // useEffect(() => {
  //   const fetchUserRooms = async () => {
  //     const result = await rooms;
  //     if (result) {
  //       setFetchedRooms(rooms || []);
  //     } else {
  //       console.error(result);
  //     }
  //     setLoading(false);
  //   };

  //   const fetchAllReservations = async () => {
  //     const result = await reservations;
  //     if (result) {
  //       setFetchedReservations(reservations || []);
  //     } else {
  //       console.error(result);
  //     }
  //   };

  //   fetchUserRooms();
  //   fetchAllReservations();
  // }, []);

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

  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => handleNextWeek(),
    onSwipedRight: () => handlePrevWeek(),
    trackMouse: true,
  });

  const handleSetFormData = useCallback(
    (reservation: Reservation) => {
      setFormData((prevData: FormData) => ({
        ...prevData,
        selectedReservationId: reservation.id,
        selectedStartDate: reservation.selected_start_date,
        selectedEndDate: reservation.selected_end_date,
        selectedStatus: reservation.selected_status,
        numOfAdults: reservation.num_of_adults,
        numOfKids: reservation.num_of_kids,
        advancePayment: reservation.advance_payment,
        deposit: reservation.deposit,
        paymentOnPlace: reservation.payment_on_place,
        localTax: reservation.local_tax,
        mainGuest: reservation.main_guest,
        phone: reservation.phone,
        email: reservation.email,
        houseNumber: reservation.house_number,
        apartmentNumber: reservation.apartment_number,
        city: reservation.city,
        postCode: reservation.post_code,
        country: reservation.country,
        passport: reservation.passport,
        company: reservation.company,
        companyStreet: reservation.company_street,
        companyCity: reservation.company_city,
        companyPostCode: reservation.company_post_code,
        companyCountry: reservation.company_country,
        companyNip: reservation.company_nip,
        notes: reservation.notes,
        passCode: reservation.pass_code,
        registration: reservation.registration,
        boarding: reservation.boarding,
      }));
    },
    [setFormData]
  );

  useEffect(() => {
    if (isEditing && selectedButton && selectedButton.room) {
      if (!originalFormDataRef.current) {
        originalFormDataRef.current = formData;
      }

      const reservation = reservations?.find(
        (res) =>
          res.room_id === selectedButton?.room.id &&
          res.selected_start_date &&
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
  }, [
    isEditing,
    // selectedButton,
    // reservations,
    handleSetFormData,
    // formData,
    // setFormData,
  ]);

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

  const rows = rooms?.map((room: Room) => {
    const days: JSX.Element[] = [];
    currentDateIterator = startDate;

    const roomReservations = reservations?.filter(
      (reservation: Reservation) => reservation.room_id === room.id
    );

    while (currentDateIterator <= endDate) {
      const currentDateTimestamp = currentDateIterator.getTime();
      let eventDuration = '';
      let eventOverlaySize = '';
      let duration = 1;

      const reservation = roomReservations?.find((res: Reservation) =>
        isSameDay(new Date(res.selected_start_date), currentDateIterator)
      );

      if (reservation) {
        const start = new Date(reservation.selected_start_date);
        const end = new Date(reservation.selected_end_date);
        const daysDifference = differenceInDays(end, start);
        duration = daysDifference + 1;
        eventDuration = `(${daysDifference + 1} dni)`;
        eventOverlaySize = `${(daysDifference + 1) * 50}px`;
      }

      days.push(
        <span
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
            <button
              className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-red-300  border border-slate-50 text-gray-700 text-sm font-semibold z-[40]  "
              style={{
                width: eventOverlaySize,
                backgroundColor: reservation?.selected_status?.color,
              }}
              onClick={() => {
                if (typeof setIsEditing === 'function') {
                  setIsEditing(true);
                } else {
                  console.error('setIsEditing is not a function');
                }
                setOpenAddReservationPanel(true);
                setOverlay(true);
              }}
            >
              {duration < 3 ? (
                reservation?.main_guest
                  .match(/(\b\S)?/g)
                  .join('')
                  .toUpperCase()
              ) : (
                <p>
                  {reservation.main_guest
                    ? reservation.main_guest
                    : 'Brak Nazwy'}
                </p>
              )}
            </button>
          )}
        </span>
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
      <LeftPanel id={id} />
      <div className="flex"> {days}</div>
      <div className="flex flex-col"> {rows}</div>
    </div>
  );
}
