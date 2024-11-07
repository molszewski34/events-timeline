import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { Room } from '../types';

export const useRoomSelection = () => {
  const { selectedRooms, setSelectedRooms, setPriceFormData } =
    useSetPriceContext();

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

  return { selectedRooms, handleRoomSelect };
};
