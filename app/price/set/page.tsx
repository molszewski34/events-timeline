// import './index.css';
import RenderRows from '@/app/components/RenderRows/RenderRows';
import AddReservationPanel from '@/app/components/Reservations/AddReservation/AddReservationPanel/AddReservationPanel';
import Footer from '@/app/components/Reservations/Footer/Footer';
import AddRoomPanel from '@/app/components/Rooms/AddRoomPanel/AddRoomPanel';
import Overlay from '@/app/components/utils/Overlay';
import { redirect } from 'next/navigation';
import OverlayDelete from '@/app/components/Reservations/AddReservation/AddReservationPanel/Header/DeleteReservationBtn/OverlayDelete';
import DeleteConfirmation from '@/app/components/Reservations/AddReservation/DeleteConfirmation/DeleteConfirmation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import useSupabaseServer from '@/utils/supabase-server';
import { cookies } from 'next/headers';

import { fetchReservations } from '@/app/actions/fetchReservations';
import { fetchRooms } from '@/app/actions/fetchRoom';
import DeleteRoomConfirmation from '@/app/components/Rooms/AddRoomPanel/DeleteConfirmation/DeleteConfirmation';
import SearchBar from '@/app/components/Navigation/SearchBar/SearchBar';
import OverlaySearchBar from '@/app/components/Navigation/SearchBar/OverlaySearchBar/OverlaySearchBar';
import SetPricePanel from '@/app/components/SetPrice/SetPricePanel/SetPricePanel';

export default async function Set({ params }: { params: { id: string } }) {
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
        <div className=""></div>
        <div className="flex">
          <div className="flex flex-col">
            <RenderRows id={params.id} />
          </div>
        </div>
        <SetPricePanel id={params.id} />
        <Footer />

        <Overlay />
        <OverlayDelete />
      </div>
    </HydrationBoundary>
  );
}
