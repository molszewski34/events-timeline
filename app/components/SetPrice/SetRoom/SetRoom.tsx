import React, { useState, useEffect } from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
const RoomSelector = ({ id }: { id: string }) => {
  const supabase = useSupabaseBrowser();

  const { data: rooms } = useQuery(fetchRooms(supabase, id));

  const { priceFormData, setPriceFormData } = useSetPriceContext();

  const [selectedRooms, setSelectedRooms] = useState([]);

  useEffect(() => {
    setSelectedRooms([priceFormData.room]);
  }, [priceFormData.room]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedRooms.length === 0) return;

    if (e.target.checked) {
      const sameCapacityRooms =
        rooms?.filter(
          (room) =>
            room.num_of_persons === priceFormData.room.num_of_persons &&
            !selectedRooms.some((selectedRoom) => selectedRoom.id === room.id)
        ) || [];
      setSelectedRooms((prevRooms) => [...prevRooms, ...sameCapacityRooms]);
    } else {
      setSelectedRooms([priceFormData.room]);
    }
  };

  const handleRemoveRoom = (roomId: string) => {
    setSelectedRooms((prevRooms) =>
      prevRooms.filter((room) => room.id !== roomId)
    );
  };

  console.log(rooms);

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <header className="border-b-2 border-gray-200 pb-2 font-semibold text-gray-400 text-[13px]">
        <h1 className="text-gray-500">Wybierz pokoje:</h1>
      </header>

      {/* Checkbox with label */}
      <div className="flex flex-col mb-4 gap-3">
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            disabled={selectedRooms.length === 0}
          />
          Zaznacz pokoje o tej samej pojemności
        </label>
        <div className="flex gap-1 ml-3">
          {selectedRooms.map((room) => (
            <button
              className="flex gap-2 items-center justify-between text-xs text-white bg-[#00a541] py-1 px-2 rounded"
              onClick={() => handleRemoveRoom(room.id)}
            >
              {room.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="15px"
                viewBox="0 -960 960 960"
                width="15px"
                fill="#fff"
              >
                <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Add room option */}
      <div className="flex flex-col">
        <span className=" flex items-center gap-1 text-[#00a541] text-sm font-medium cursor-pointer border-b-2 border-gray-200">
          <i className="text-xl">add</i>{' '}
          <p className="text-xs">Dodaj kolejny pokój</p>
        </span>
      </div>
    </div>
  );
};

export default RoomSelector;
