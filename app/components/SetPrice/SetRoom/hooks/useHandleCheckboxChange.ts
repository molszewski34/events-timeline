import React from 'react';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

interface Room {
  id: string;
  num_of_persons: number;
}

interface PriceFormData {
  room: Room;
  selectedRooms: Room[];
  id: string;
}

function useHandleCheckboxChange(rooms: Room[]) {
  const { setPriceFormData, selectedRooms, setSelectedRooms, room } =
    useSetPriceContext();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedRooms.length === 0) return;

    if (e.target.checked) {
      const sameCapacityRooms =
        rooms?.filter(
          (room) =>
            room.num_of_persons === room.num_of_persons &&
            !selectedRooms.some(
              (selectedRoom: PriceFormData) => selectedRoom.id === room.id
            )
        ) || [];

      setSelectedRooms([...selectedRooms, ...sameCapacityRooms]);

      const sameCapacityRoomIds = sameCapacityRooms.map((room) => room.id);
      setPriceFormData((prev: PriceFormData) => ({
        ...prev,
        selectedRoomsIds: [...sameCapacityRoomIds],
      }));
    } else {
      setSelectedRooms([room]);
    }
  };

  return { handleCheckboxChange };
}

export default useHandleCheckboxChange;
