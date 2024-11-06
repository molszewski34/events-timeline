import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { Room } from '@/app/data/types';

interface PriceFormData {
  selectedRooms: Room[];
}

function useHandleRemoveRoom() {
  const { selectedRooms, setSelectedRooms } = useSetPriceContext();
  const handleRemoveRoom = (roomId: string) => {
    setSelectedRooms(selectedRooms.filter((room: Room) => room.id !== roomId));
  };
  return { handleRemoveRoom };
}

export default useHandleRemoveRoom;
