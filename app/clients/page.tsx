'use client';
import { useState, useEffect } from 'react';
// import { useReservations } from '../hooks/Booking/useReservations';
import SearchInput from '../components/Clients/SearchInput';
import ClientsList from '../components/Clients/ClientsList';
import useClients from '../components/Clients/useClients';
import Overlay from '../components/utils/Overlay';
import ClientDetails from '../components/Clients/ClientDetails/ClientDetails';
import AddReservationPanel from '../components/Reservations/AddReservation/AddReservationPanel/AddReservationPanel';

const Clients = ({ id, params }: { params: { id: string }; id: string }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAscending, setIsAscending] = useState(true);
  const [openDetails, setOpenDetails] = useState(false);
  const { filteredReservations, error } = useClients(
    id,

    searchQuery
  );

  const [selectedReservation, setSelectedReservation] = useState('');
  console.log(selectedReservation);
  return (
    <div className="flex flex-col items-center justify-center bg-white mt-6 mx-2 border border-gray-300 border-b-0 py-1 rounded-md relative">
      <div className="flex flex-col px-2 w-full gap-4">
        <div className="flex justify-between">
          <header className="flex bg-white w-full">
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold">Klienci</p>
            </div>
          </header>
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <ClientsList
          filteredReservations={filteredReservations}
          isAscending={isAscending}
          setIsAscending={setIsAscending}
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
          selectedReservation={selectedReservation}
          setSelectedReservation={setSelectedReservation}
        />
      </div>
      <ClientDetails
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        selectedReservation={selectedReservation}
        setSelectedReservation={setSelectedReservation}
      />
      <Overlay />
      <AddReservationPanel />
    </div>
  );
};

export default Clients;
