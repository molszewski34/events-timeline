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
import useHandleSetFormData from '@/app/hooks/SearchResults/handleSetFormData';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import AddReservationPanel from '../components/Reservations/AddReservation/AddReservationPanel/AddReservationPanel';
import OverlaySearchBar from '../components/Navigation/SearchBar/OverlaySearchBar/OverlaySearchBar';
import SearchBar from '../components/Navigation/SearchBar/SearchBar';
import DeleteRoomConfirmation from '../components/Rooms/AddRoomPanel/DeleteConfirmation/DeleteConfirmation';
import DeleteConfirmation from '../components/Reservations/AddReservation/DeleteConfirmation/DeleteConfirmation';
import OverlayDelete from '../components/Reservations/AddReservation/AddReservationPanel/Header/DeleteReservationBtn/OverlayDelete';
import Overlay from '../components/utils/Overlay';

export default function Home({
  id,
  params,
}: {
  params: { id: string };
  id: string;
}) {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredReservations, setFilteredReservations] = useState<
    Database['public']['Tables']['reservations']['Row'][]
  >([]);
  const supabase = useSupabaseBrowser();
  const { handleSetFormData } = useHandleSetFormData();

  const { data: reservations, error } = useQuery(
    fetchReservations(supabase, id)
  );

  console.log(reservations);

  type Reservation = Database['public']['Tables']['reservations']['Row'];

  const { setIsEditing, setOverlay, setOpenSearchBar, setOverlaySearchBar } =
    useCalendarContext();

  const {
    setFormData,
    formData,
    setOpenAddReservationPanel,
    openAddReservationPanel,
  } = useAddReservationContext();

  useEffect(() => {
    const formattedMonth = format(currentDate, 'MMM');
    const formattedYear = format(currentDate, 'yyyy');
    const formattedDate = format(currentDate, 'MMMM yyyy');
    setMonth(formattedMonth);
    setYear(formattedYear);
    setDate(formattedDate);

    if (reservations) {
      const filtered = reservations.filter((reservation: Reservation) => {
        const reservationMonth = getMonth(
          new Date(reservation.selected_start_date)
        );
        const reservationYear = getYear(
          new Date(reservation.selected_start_date)
        );
        return (
          reservationMonth === getMonth(currentDate) &&
          reservationYear === getYear(currentDate)
        );
      });

      setFilteredReservations(filtered);
    }
  }, [currentDate, reservations]);

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

  if (error) {
    return <div>Error loading reservations</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 mt-6">
      <div className="p-6 bg-white rounded shadow-md w-full mx-3">
        <label
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs"
          htmlFor="date"
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
            filteredReservations.map((reservation) => {
              const startDate = new Date(reservation.selected_start_date);
              const endDate = new Date(reservation.selected_end_date);
              return (
                <div
                  key={reservation.id}
                  className="flex flex-col py-2 px-4 gap-2 hover:bg-gray-100"
                  onClick={() => {
                    handleSetFormData(reservation);
                    setIsEditing(true);
                    setOverlaySearchBar(false);
                    setOpenSearchBar(false);
                    setOpenAddReservationPanel(true);
                    setOverlay(true);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: reservation.selected_status.color,
                      }}
                    ></div>
                    <p className="text-xs font-semibold">
                      {' '}
                      {reservation.main_guest}
                    </p>
                  </div>
                  <div className="flex justify-between text-xs ">
                    <div className="flex gap-2 basis-1/2">
                      <span className="text-gray-500 font-semibold">Od</span>
                      <p className="font-semibold">
                        {startDate.toISOString().substring(0, 10)}
                      </p>
                    </div>
                    <div className="flex gap-2 basis-1/2">
                      <span className="text-gray-500 font-semibold">Do</span>
                      <p className="font-semibold">
                        {endDate.toISOString().substring(0, 10)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-gray-500 font-semibold">Telefon</span>
                    <p className="font-semibold"> {reservation.phone}</p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-gray-500 font-semibold">Email</span>
                    <p className="font-semibold"> {reservation.email}</p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-gray-500 font-semibold">ID</span>
                    <p className="font-semibold"> {reservation.id}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <li>No reservations for {date}</li>
          )}
        </ul>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg w-1/3 flex flex-col items-center justify-center">
            <div className="flex bg-green-600 text-white text-center w-full py-4 justify-evenly">
              <button onClick={decrementMonth}>
                <i>arrow_back_ios</i>
              </button>
              <h2 className="text-2xl">{month}</h2>
              <button onClick={incrementMonth}>
                <i>arrow_forward_ios</i>
              </button>
            </div>
            <div className="flex text-center w-full py-4 justify-evenly items-center">
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
      <AddReservationPanel />
      <Overlay />
      <OverlayDelete />
      <DeleteConfirmation />
      <DeleteRoomConfirmation id={params.id} />
      <SearchBar />
      <OverlaySearchBar />
    </div>
  );
}
