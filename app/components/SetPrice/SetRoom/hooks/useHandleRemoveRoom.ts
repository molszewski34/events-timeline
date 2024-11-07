import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { Room } from '@/app/data/types';

function useHandleRemoveRoom() {
  const { selectedRooms, setSelectedRooms, setPriceFormData, priceFormData } =
    useSetPriceContext();

  const handleRemoveRoom = (roomId: string) => {
    const updatedSelectedRooms = selectedRooms.filter(
      (room: Room) => room.id !== roomId
    );
    const updatedSelectedRoomsIds = priceFormData.selectedRoomsIds.filter(
      (id: string) => id !== roomId
    );

    setSelectedRooms(updatedSelectedRooms);
    setPriceFormData((prev: Room) => ({
      ...prev,
      selectedRoomsIds: updatedSelectedRoomsIds,
    }));
  };
  return { handleRemoveRoom };
}

export default useHandleRemoveRoom;
