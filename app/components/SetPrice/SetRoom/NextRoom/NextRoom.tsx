import React from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';

const NextRoom = ({ id }: { id: string }) => {
  const supabase = useSupabaseBrowser();
  const { data: rooms } = useQuery(fetchRooms(supabase, id));

  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter rooms based on searchTerm
  const filteredRooms =
    rooms?.filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="flex flex-col p-4">
      {/* Header */}
      <header className="border-b-2 border-gray-200 pb-2 font-semibold text-gray-400 text-[13px]">
        <h1 className="text-gray-500">Lista pokoi:</h1>
      </header>

      {/* Search input */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Wyszukaj pokój..."
          className="w-full p-2 border rounded border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* List of rooms */}
      <div className="flex flex-col mt-4">
        {filteredRooms.map((room) => (
          <div key={room.id} className="p-2 border-b border-gray-300">
            <span className="text-gray-600">{room.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextRoom;
