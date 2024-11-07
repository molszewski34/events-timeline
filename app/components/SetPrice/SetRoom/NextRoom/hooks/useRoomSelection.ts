import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { Room } from '../types';

export const useRoomSelection = () => {
  const { selectedRooms, setSelectedRooms, setPriceFormData } =
    useSetPriceContext();

  const handleRoomSelect = (selectedRoom: Room) => {
    const isRoomSelected = selectedRooms.some(
      (room: Room) => room.id === selectedRoom.id
    );

    setSelectedRooms(
      isRoomSelected
        ? selectedRooms.filter((room: Room) => room.id !== selectedRoom.id)
        : [...selectedRooms, selectedRoom]
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

  return { selectedRooms, handleRoomSelect };
};
