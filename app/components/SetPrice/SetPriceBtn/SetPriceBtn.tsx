import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { SetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
const SetPriceBtn = () => {
  const { openSetPricePanel, setOpenSetPricePanel } = SetPriceContext();

  console.log(openSetPricePanel);
  return (
    <div
      onClick={() => {
        setOpenSetPricePanel(true);
        // setOverlay(true);
      }}
      className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 w-[42px] h-[46px]  bg-white  z-[40] shadow-sm cursor-pointer"
    >
      +
    </div>
  );
};
export default SetPriceBtn;
