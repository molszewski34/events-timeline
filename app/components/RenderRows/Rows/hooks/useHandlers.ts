import { useSwipeable } from "react-swipeable";
import { useCalendarContext } from "@/app/contexts/Calendar/CalendarProvider";
import { addDays } from "date-fns";

export default function useHandlers() {
    const {
        setStartDate,
      } = useCalendarContext();
    
 const handlers = useSwipeable({
        onSwipedLeft: () => setStartDate((prev: Date) => addDays(prev, 7)),
        onSwipedRight: () => setStartDate((prev: Date) => addDays(prev, -7)),
        trackMouse: true,
      });
  return {
   handlers
  }
}


