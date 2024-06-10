import './index.css';
import RenderRows from '../components/RenderRows/RenderRows';
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
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import useSupabaseServer from '@/utils/supabase-server';
import { cookies } from 'next/headers';

import { fetchReservations } from '../actions/fetchReservations';
import { fetchRooms } from '../actions/fetchRoom';

export default async function Calendar({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);
  await prefetchQuery(queryClient, fetchReservations(supabase, params.id));
  await prefetchQuery(queryClient, fetchRooms(supabase, params.id));
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="calendar overflow-hidden">
        <div className="">
          <NavMobile>
            <AuthButton />
          </NavMobile>
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <RenderRows id={params.id} />
          </div>
        </div>
        <Footer />
        <AddReservationPanel />
        <AddRoomPanel />
        <Overlay />
        <OverlayDelete />
        <DeleteConfirmation />
      </div>
    </HydrationBoundary>
  );
}
