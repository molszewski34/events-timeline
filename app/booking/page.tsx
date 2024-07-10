'use client';

import { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  addYears,
  subMonths,
  subYears,
  getMonth,
  getYear,
} from 'date-fns';
import { Database } from '@/types/supabase';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchReservations } from '@/app/actions/fetchReservations';
import useSupabaseBrowser from '@/utils/supabase-browser';

export default function Home({ id }: { id: string }) {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredReservations, setFilteredReservations] = useState([]);
  const supabase = useSupabaseBrowser();

  const { data: reservations } = useQuery(fetchReservations(supabase, id));

  type Reservation = Database['public']['Tables']['reservations']['Row'];

  useEffect(() => {
    const formattedMonth = format(currentDate, 'MMM');
    const formattedYear = format(currentDate, 'yyyy');
    const formattedDate = format(currentDate, 'MMMM yyyy');
    setMonth(formattedMonth);
    setYear(formattedYear);
    setDate(formattedDate);

    const filtered = reservations.filter((reservation) => {
      const reservationMonth = getMonth(reservation.selected_start_date);
      const reservationYear = getYear(reservation.selected_start_date);
      return (
        reservationMonth === getMonth(currentDate) &&
        reservationYear === getYear(currentDate)
      );
    });

    setFilteredReservations(filtered);
  }, [currentDate]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const incrementMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const incrementYear = () => {
    setCurrentDate(addYears(currentDate, 1));
  };

  const decrementMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const decrementYear = () => {
    setCurrentDate(subYears(currentDate, 1));
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100  mt-6">
      <div className="p-6 bg-white rounded shadow-md w-full mx-3">
        <label
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs"
          htmlFor=""
          onClick={openModal}
        >
          <input type="text" id="date" value={date} readOnly />
          <i>calendar_today</i>
        </label>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Filtered Reservations</h3>
        <ul className="mt-2">
          {filteredReservations.length > 0 ? (
            filteredReservations.map((reservation) => (
              <li key={reservation.id}>
                {format(reservation.selected_start_date, 'MMMM d, yyyy')}
              </li>
            ))
          ) : (
            <li>No reservations for {date}</li>
          )}
        </ul>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white   shadow-lg w-1/3 flex flex-col items-center justify-center ">
            <div className="flex bg-green-600 text-white text-center w-full py-4 justify-evenly">
              <button onClick={decrementMonth}>
                <i>arrow_back_ios</i>
              </button>

              <h2 className=" text-2xl ">{month}</h2>
              <button onClick={incrementMonth}>
                <i>arrow_forward_ios</i>
              </button>
            </div>
            <div className="flex   text-center w-full py-4 justify-evenly items-center">
              <button onClick={decrementYear}>
                <i>arrow_back_ios</i>
              </button>
              <p className="flex py-4 mt-2 text-xl font-bold">{year}</p>
              <button onClick={incrementYear}>
                <i>arrow_forward_ios</i>
              </button>
            </div>
            <button
              onClick={closeModal}
              className="py-2 px-3 bg-green-600 text-white rounded-t-full text-4xl"
            >
              <i>check</i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
