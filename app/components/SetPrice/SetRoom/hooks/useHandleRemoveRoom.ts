import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { Room } from '@/app/data/types';

interface PriceFormData {
    selectedRooms: Room[];
  }
  

function useHandleRemoveRoom() {
    const {setPriceFormData} = useSetPriceContext()

    const handleRemoveRoom = (roomId: string) => {
        setPriceFormData((prev: PriceFormData) => ({
          ...prev,
          selectedRooms: prev.selectedRooms.filter((room: Room) => room.id !== roomId),
        }));
      };
  return {handleRemoveRoom}
}

export default useHandleRemoveRoom