import { useCallback, useState } from "react";
import { useAddReservationContext } from "@/app/contexts/AddReservation/AddReservationProvider";
import { useSetPriceContext } from "@/app/contexts/SetPrice/SetPriceProvider";
interface Room {
    id: number;
    name: string;
  }

function useHandleButtonClick() {
    const {setSelectedButton} = useAddReservationContext();
      const {setPriceFormData} = useSetPriceContext()

    const handleButtonClick = useCallback(
        (room: Room, timestamp: number) => {
          setSelectedButton({ room, timestamp });
          setPriceFormData((prevData: FormData) => ({
            ...prevData,
            room: room
          }));
        
        },
        [setSelectedButton]
      );
    return {
        handleButtonClick 
    }
}

export default useHandleButtonClick