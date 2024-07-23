'use client';
import { useState, useEffect } from 'react';
// import { useReservations } from '../hooks/Booking/useReservations';
import SearchInput from '../components/Clients/SearchInput';
import ClientsList from '../components/Clients/ClientsList';
import useClients from '../components/Clients/useClients';
const Clients = ({ id, params }: { params: { id: string }; id: string }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { filteredReservations, error } = useClients(
    id,

    searchQuery
  );

  console.log(searchQuery);
  return (
    <div className="flex flex-col items-center justify-center bg-white mt-6 mx-2 border border-gray-300 border-b-0 py-1">
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
        <ClientsList filteredReservations={filteredReservations} />
      </div>
    </div>
  );
};

export default Clients;
