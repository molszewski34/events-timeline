import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
const Button = () => {
  const { openAddReservationPanel, setOpenAddReservationPanel } =
    useAddReservationContext();
  const { overlay, setOverlay } = useCalendarContext();
  return (
    <div
      onClick={() => {
        setOpenAddReservationPanel(true);
        setOverlay(true);
      }}
      className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 w-[50px] h-[50px] bg-white skew-x-[-35deg] z-[60] shadow-sm"
    >
      +
    </div>
  );
};

export default Button;
