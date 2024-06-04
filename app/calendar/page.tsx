import './index.css';
import { RenderRows } from '../components/RenderRows/RenderRows';
import AddReservationPanel from '../components/Reservations/AddReservation/AddReservationPanel/AddReservationPanel';
import NavMobile from '../components/Navigation/mobile/NavMobile';
import Footer from '../components/Reservations/Footer/Footer';
import AddRoomPanel from '../components/Rooms/AddRoomPanel/AddRoomPanel';
import Overlay from '../components/utils/Overlay';
import AuthButton from '../components/Navigation/AuthButton/AuthButton';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import OverlayDelete from '../components/Reservations/AddReservation/AddReservationPanel/Header/DeleteReservationBtn/OverlayDelete';
import DeleteConfirmation from '../components/Reservations/AddReservation/DeleteConfirmation/DeleteConfirmation';

const Calendar: React.FC = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="calendar overflow-hidden">
      <div className="">
        <NavMobile>
          <AuthButton />
        </NavMobile>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <RenderRows />
        </div>
      </div>
      <Footer />
      <AddReservationPanel />
      <AddRoomPanel />
      <Overlay />
      <OverlayDelete />
      <DeleteConfirmation />
    </div>
  );
};

export default Calendar;
