import React from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

interface Room {
  id: string;
  name: string;
  selectedRoomsIds: string[];
}

const NextRoom = ({ id }: { id: string }) => {
  const supabase = useSupabaseBrowser();
  const { data: rooms } = useQuery(fetchRooms(supabase, id));
  const { setPriceFormData, selectedRooms, setSelectedRooms } =
    useSetPriceContext();

  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredRooms =
    rooms?.filter((room) =>
      room.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleRoomSelect = (selectedRoom: Room) => {
    const isRoomSelected = selectedRooms.some(
      (roomId: string) => roomId === selectedRoom.id
    );

    setSelectedRooms(
      isRoomSelected
        ? selectedRooms.filter((roomId: string) => roomId !== selectedRoom.id)
        : [...selectedRooms, selectedRoom.id]
    );

    setPriceFormData((prev: Room) => ({
      ...prev,
      selectedRoomsIds: isRoomSelected
        ? prev.selectedRoomsIds.filter(
            (roomId: string) => roomId !== selectedRoom.id
          )
        : [...prev.selectedRoomsIds, selectedRoom.id],
    }));
  };

  return (
    <div className="flex flex-col p-2 absolute top-6 bg-white border-2 border-gray-100 w-full rounded-sm">
      <header className="pt-2 font-semibold text-gray-400 text-[13px]">
        <h1 className="text-gray-500">Wybierz lub wyszukaj z listy</h1>
      </header>

      <div className="flex mt-2 border rounded border-gray-300 gap-2 py-1 px-2">
        <div className="flex gap-2">
          {selectedRooms?.map((roomId: string) => {
            const room = rooms?.find((room) => room.id === roomId);
            return (
              room && (
                <button
                  key={room.id}
                  className="flex flex-nowrap gap-2 items-center justify-between text-xs text-white bg-[#00a541] py-1 px-2 rounded h-[23px]"
                  onClick={() => handleRoomSelect(room)}
                >
                  <p className="flex flex-wrap whitespace-nowrap">
                    {room.name}
                  </p>
                  <i className="text-sm">cancel</i>
                </button>
              )
            );
          })}
        </div>

        <input
          type="text"
          className="w-full h-[23px] p-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-4">
        {filteredRooms.map((room, index) => (
          <button
            key={room.id}
            className={`p-2 ${
              index !== filteredRooms.length - 1
                ? 'border-b border-gray-300'
                : ''
            } flex items-center gap-1 hover:bg-gray-100 py-1`}
            onClick={() => handleRoomSelect(room)}
          >
            <i className="text-green-600">{room.type_icon}</i>
            <span className="text-gray-600 text-xs">{room.name}</span>

            <i className="text-gray-400 text-base">person</i>
            <p className="text-xs">{room.num_of_persons}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NextRoom;
