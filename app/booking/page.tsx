'use client';
import { useState, useEffect } from 'react';
import { useDate } from '../hooks/Booking/useDate';
import { useReservations } from '../hooks/Booking/useReservations';
import ReservationList from '../components/Booking/ReservationList';
import SearchInput from '../components/Booking/SearchInput';
import DateSelectorModal from '../components/Booking/DateSelectorModal';
import TabSelector from '../components/Booking/TabSelector';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'Najnowsze' | 'Anulowane'>(
    'Najnowsze'
  );

  const {
    currentDate,
    formattedMonth,
    formattedYear,
    formattedDate,
    incrementMonth,
    incrementYear,
    decrementMonth,
    decrementYear,
  } = useDate();

  const { filteredReservations, error } = useReservations(
    id,
    currentDate,
    searchQuery
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleTabClick = (tab: 'Najnowsze' | 'Anulowane') => setActiveTab(tab);

  if (error) {
    return <div>Error loading reservations</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white mt-6 mx-2 border border-gray-300 border-b-0">
      <div className="flex flex-col px-2 w-full gap-2">
        <div className="flex justify-between">
          <header className="flex bg-white w-full">
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold">Lista rezerwacji</p>
              <div className="bg-gray-300 text-[0.68em] flex items-center py-[0.15em] px-[0.68em] rounded-sm">
                {filteredReservations.length}
              </div>
            </div>
          </header>
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="pb-0 bg-white rounded-t-sm shadow-bottom w-full relative">
          <label
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs"
            htmlFor="date"
            onClick={openModal}
          >
            <input type="text" id="date" value={formattedDate} readOnly />
            <i>calendar_today</i>
          </label>
          <TabSelector activeTab={activeTab} handleTabClick={handleTabClick} />
          <DateSelectorModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            month={formattedMonth}
            year={formattedYear}
            incrementMonth={incrementMonth}
            decrementMonth={decrementMonth}
            incrementYear={incrementYear}
            decrementYear={decrementYear}
          />
        </div>
      </div>
      <ReservationList
        filteredReservations={filteredReservations}
        activeTab={activeTab}
      />
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
