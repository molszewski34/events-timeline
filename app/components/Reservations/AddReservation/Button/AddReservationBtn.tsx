import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
const AddReservationBtn = () => {
  const { openAddReservationPanel, setOpenAddReservationPanel } =
    useAddReservationContext();
  const { overlay, setOverlay } = useCalendarContext();
  return (
    <div
      onClick={() => {
        setOpenAddReservationPanel(true);
        setOverlay(true);
      }}
      className="absolute flex justify-center items-center top-1 bottom-0 left-5 right-0 w-[40px] h-[40px]  bg-white skew-x-[-35deg] z-[40] shadow-sm"
    >
      +
    </div>
  );
};

export default AddReservationBtn;
