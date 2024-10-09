import React, { useState, useEffect } from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import NextRoom from './NextRoom/NextRoom';

const RoomSelector = ({ id }: { id: string }) => {
  const supabase = useSupabaseBrowser();

  const { data: rooms } = useQuery(fetchRooms(supabase, id));

  const { priceFormData, setPriceFormData } = useSetPriceContext();
  const [isNextRoomVisible, setIsNextRoomVisible] = useState(false);

  useEffect(() => {
    setPriceFormData((prev) => ({
      ...prev,
      selectedRooms: [priceFormData.room],
    }));
  }, [priceFormData.room, setPriceFormData]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (priceFormData.selectedRooms.length === 0) return;

    if (e.target.checked) {
      const sameCapacityRooms =
        rooms?.filter(
          (room) =>
            room.num_of_persons === priceFormData.room.num_of_persons &&
            !priceFormData.selectedRooms.some(
              (selectedRoom) => selectedRoom.id === room.id
            )
        ) || [];

      setPriceFormData((prev) => ({
        ...prev,
        selectedRooms: [...prev.selectedRooms, ...sameCapacityRooms],
      }));
    } else {
      setPriceFormData((prev) => ({
        ...prev,
        selectedRooms: [priceFormData.room],
      }));
    }
  };

  const handleRemoveRoom = (roomId: string) => {
    setPriceFormData((prev) => ({
      ...prev,
      selectedRooms: prev.selectedRooms.filter((room) => room.id !== roomId),
    }));
  };

  const handleOverlayClick = () => {
    setIsNextRoomVisible(false);
  };

  return (
    <div className="relative flex flex-col gap-2">
      {isNextRoomVisible && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0  bg-black bg-opacity-0 z-0"
          onClick={handleOverlayClick}
        />
      )}

      <div className="relative">
        <header className="border-b-2 border-gray-200 pb-2 font-semibold text-gray-400 text-[13px]">
          <h1 className="text-gray-500">Wybierz pokoje:</h1>
        </header>
        <div className="flex flex-col mb-4 gap-3 relative">
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              disabled={
                priceFormData.selectedRooms.length === 0 || isNextRoomVisible
              }
              className="accent-green-600"
            />
            Zaznacz pokoje o tej samej pojemności
          </label>
          {isNextRoomVisible && <NextRoom id="id" />}

          <div className="flex gap-1 ml-3">
            {priceFormData.selectedRooms.map((room) => (
              <button
                key={room.id}
                className="flex gap-2 items-center justify-between text-xs text-white bg-[#00a541] py-1 px-2 rounded h-[23px]"
                onClick={() => handleRemoveRoom(room.id)}
              >
                {room.name}
                <i className="text-sm">cancel</i>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <span
            onClick={() => setIsNextRoomVisible(true)}
            className="flex items-center gap-1 text-[#00a541] text-sm font-medium cursor-pointer border-b-2 border-gray-200"
          >
            <i className="text-xl">add</i>
            <p className="text-xs">Dodaj kolejny pokój</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoomSelector;
