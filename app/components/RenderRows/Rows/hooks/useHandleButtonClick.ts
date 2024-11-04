import { useCallback, useState } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { Room } from '../../types';

function useHandleButtonClick() {
  const { setSelectedButton, setFormData } = useAddReservationContext();
  const { setPriceFormData } = useSetPriceContext();

  const handleButtonClick = useCallback(
    (room: Room, timestamp: number) => {
      setSelectedButton({ room, timestamp });
      setFormData((prevData: FormData) => ({
        ...prevData,

        selectedRoom: room,
        selectedRoomId: room.id,
      }));
      setPriceFormData((prevData: FormData) => ({
        ...prevData,
        room: room,
      }));
    },
    [setSelectedButton]
  );
  return {
    handleButtonClick,
  };
}

export default useHandleButtonClick;
