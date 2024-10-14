import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
const SetPriceBtn = () => {
  const { openSetPricePanel, setOpenSetPricePanel } = useSetPriceContext();
  const { setOverlay } = useCalendarContext();
  console.log(openSetPricePanel);
  return (
    <div
      onClick={() => {
        setOpenSetPricePanel(true);
        setOverlay(true);
      }}
      className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 w-[42px] h-[46px]  bg-white  z-[40] shadow-sm cursor-pointer opacity-0 md:opacity-100"
    >
      +
    </div>
  );
};
export default SetPriceBtn;
