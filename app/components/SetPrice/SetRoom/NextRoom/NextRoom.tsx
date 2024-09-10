import React from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';

const NextRoom = ({ id }: { id: string }) => {
  const supabase = useSupabaseBrowser();
  const { data: rooms } = useQuery(fetchRooms(supabase, id));

  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredRooms =
    rooms?.filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="flex flex-col p-2 absolute bg-white border-2 border-gray-100 w-full rounded-sm">
      <header className=" pt-2 font-semibold text-gray-400 text-[13px]">
        <h1 className="text-gray-500">Wybierz lub wyszukaj z listy</h1>
      </header>

      <div className="mt-2">
        <input
          type="text"
          className="w-full p-1 border rounded border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-4">
        {filteredRooms.map((room, index) => (
          <div
            key={room.id}
            className={`p-2 ${
              index !== filteredRooms.length - 1
                ? 'border-b border-gray-300'
                : ''
            } flex items-center gap-1 hover:bg-gray-200 py-1`}
          >
            <i className="text-green-600">{room.type_icon}</i>
            <span className="text-gray-600 text-xs">{room.name}</span>

            <i className="text-gray-400 text-base">person</i>
            <p className="text-xs">{room.num_of_persons}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextRoom;
