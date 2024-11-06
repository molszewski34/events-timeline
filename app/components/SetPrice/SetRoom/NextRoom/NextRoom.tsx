import React from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useRoomSearch } from './hooks/useRoomSearch';

import SelectedRooms from './ui/SelectedRooms';
import SearchBar from './ui/SearchBar';
import RoomList from './ui/RoomList';
import { useRoomSelection } from './hooks/useRoomSelection';

const NextRoom = ({ id }: { id: string }) => {
  const supabase = useSupabaseBrowser();
  const { data: rooms } = useQuery(fetchRooms(supabase, id));
  const { searchTerm, setSearchTerm, filteredRooms } = useRoomSearch(rooms);
  const { selectedRooms, handleRoomSelect } = useRoomSelection();

  return (
    <div className="flex flex-col p-2 absolute top-6 bg-white border-2 border-gray-100 w-full rounded-sm">
      <header className="pt-2 font-semibold text-gray-400 text-[13px]">
        <h1 className="text-gray-500">Wybierz lub wyszukaj z listy</h1>
      </header>

      <div className="flex mt-2 border rounded border-gray-300 gap-2 py-1 px-2">
        <SelectedRooms
          selectedRooms={selectedRooms}
          rooms={rooms}
          onRoomSelect={handleRoomSelect}
        />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      <RoomList rooms={filteredRooms} onRoomSelect={handleRoomSelect} />
    </div>
  );
};

export default NextRoom;
