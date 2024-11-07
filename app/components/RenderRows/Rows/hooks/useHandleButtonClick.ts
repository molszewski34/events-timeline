import { useCallback, useState } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { Room } from '../../types';

function useHandleButtonClick() {
  const { setSelectedButton, setFormData } = useAddReservationContext();
  const { setRoom } = useSetPriceContext();

  const handleButtonClick = useCallback(
    (room: Room, timestamp: number) => {
      setSelectedButton({ room, timestamp });
      setFormData((prevData: FormData) => ({
        ...prevData,

        selectedRoom: room,
        selectedRoomId: room.id,
      }));
      setRoom(room);
    },
    [setSelectedButton]
  );
  return {
    handleButtonClick,
  };
}

export default useHandleButtonClick;
