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
import './styles.css';

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
  const [activeTab, setActiveTab] = useState<'Najnowsze' | 'Anulowane'>(
    'Najnowsze'
  );
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

  const handleTabClick = (tab: 'Najnowsze' | 'Anulowane') => {
    setActiveTab(tab);
  };

  if (error) {
    return <div>Error loading reservations</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 mt-6 mx-2">
      <div className="p-2 pb-0 bg-white rounded-t-sm shadow-md w-full mx-3 relative">
        <label
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs"
          htmlFor="date"
          onClick={openModal}
        >
          <input type="text" id="date" value={date} readOnly />
          <i>calendar_today</i>
        </label>
        <div className="flex justify-center">
          <button
            onClick={() => handleTabClick('Najnowsze')}
            className={`py-2 pt-4 w-full ${
              activeTab === 'Najnowsze'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500'
            }`}
          >
            Najnowsze
          </button>
          <button
            onClick={() => handleTabClick('Anulowane')}
            className={`py-2 px-4 w-full ${
              activeTab === 'Anulowane'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500'
            }`}
          >
            Anulowane
          </button>
        </div>
        {isModalOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-[180px] flex items-center justify-center z-50 animate-slide-down shadow-md">
            <div className="w-full bg-white shadow-lg flex flex-col">
              <div className="flex bg-green-600 text-white text-center w-full py-4 justify-evenly">
                <button onClick={decrementMonth}>
                  <i>arrow_back_ios</i>
                </button>
                <h2 className="text-2xl">{month}</h2>
                <button onClick={incrementMonth}>
                  <i>arrow_forward_ios</i>
                </button>
              </div>
              <div className="flex text-center w-full justify-evenly items-center">
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
                className="py-2 px-3 bg-green-600 text-white rounded-t-full text-4xl w-14 h-14 place-self-center"
              >
                <i>check</i>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full bg-gray-100">
        <ul className="flex flex-col gap-2">
          {filteredReservations.length > 0 ? (
            filteredReservations
              .filter((reservation) =>
                activeTab === 'Najnowsze'
                  ? reservation.selected_status.name !== 'Anulowana'
                  : reservation.selected_status.name === 'Anulowana'
              )
              .map((reservation) => {
                const startDate = new Date(reservation.selected_start_date);
                const endDate = new Date(reservation.selected_end_date);
                return (
                  <div
                    key={reservation.id}
                    className="flex flex-col py-2 px-4 gap-2 hover:bg-gray-100 bg-white"
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
                      <span className="text-gray-500 font-semibold">
                        Telefon
                      </span>
                      <p className="font-semibold">{reservation.phone}</p>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="text-gray-500 font-semibold">Email</span>
                      <p className="font-semibold">{reservation.email}</p>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="text-gray-500 font-semibold">ID</span>
                      <p className="font-semibold">{reservation.id}</p>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="bg-white">Brak rezerwacji w tym miesiącu</div>
          )}
        </ul>
      </div>

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
