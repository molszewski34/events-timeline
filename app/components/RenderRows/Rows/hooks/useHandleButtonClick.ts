import { useCallback, useState } from "react";
import { useAddReservationContext } from "@/app/contexts/AddReservation/AddReservationProvider";
interface Room {
    id: number;
    name: string;
  }

function useHandleButtonClick() {
    const {
       
        setSelectedButton,
      } = useAddReservationContext();

    const handleButtonClick = useCallback(
        (room: Room, timestamp: number) => {
          setSelectedButton({ room, timestamp });
        },
        [setSelectedButton]
      );
    return {
        handleButtonClick 
    }
}

export default useHandleButtonClick