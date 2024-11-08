import { useState, useCallback } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

interface Room {
  id: number;
  name: string;
}

interface FormData {
  currentDateTimestamp: number;
  room?: Room;
}

function useMouseHandlers() {
  const { setFormData, setSelectedButton } = useAddReservationContext();

  const { currentDateTimestamp, setCurrentDateTimestamp, setRoom } =
    useSetPriceContext();

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [priceFormData, setPriceFormData] = useState<FormData>({
    currentDateTimestamp: 0,
  });
  const [hoveredColumnIndex, setHoveredColumnIndex] = useState<number | null>(
    null
  );
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback(
    (room: Room, timestamp: number) => {
      setSelectedButton({ room, timestamp });
      setIsButtonVisible(true);

      setFormData((prevData: FormData) => ({
        ...prevData,
        currentDateTimestamp: timestamp,
        selectedRoom: room,
        selectedRoomId: room.id,
      }));

      setCurrentDateTimestamp(timestamp);
      setRoom(room);
    },
    [setSelectedButton, setFormData, currentDateTimestamp]
  );

  const handleMouseLeave = useCallback(() => {
    setIsButtonVisible(false);
    setHoveredColumnIndex(null);
    setHoveredRowIndex(null);
  }, []);

  return {
    isButtonVisible: true,
    currentDateTimestamp,
    handleMouseEnter,
    handleMouseLeave,
    hoveredColumnIndex,
    setHoveredColumnIndex,
    hoveredRowIndex,
    setHoveredRowIndex,
  };
}

export default useMouseHandlers;
