// RenderRows.tsx
'use client';

import React, { useEffect } from 'react';
import { addDays } from 'date-fns';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useSwipeable } from 'react-swipeable';
import LeftPanel from '../LeftPanel/LeftPanel';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import Reservations from './Rows/Reservations';
import { fetchPrices } from '@/app/actions/fetchPrices';
import { fetchReservations } from '@/app/actions/fetchReservations';
import { fetchRooms } from '@/app/actions/fetchRoom';
import Days from './Days/Days';
import useHandlers from './Rows/hooks/useHandlers';
import useHandlerResize from './Rows/hooks/useHandlerResize';
import Prices from './Rows/Prices';
import { usePathname } from 'next/navigation';
export default function RenderRows({ id }: { id: string }) {
  const supabase = useSupabaseBrowser();

  const { data: prices } = useQuery(fetchPrices(supabase, id));
  const { data: reservations } = useQuery(fetchReservations(supabase, id));
  const { data: rooms } = useQuery(fetchRooms(supabase, id));

  const { currentDate, startDate } = useCalendarContext();

  const { handlers } = useHandlers();
  const { handleResize } = useHandlerResize();

  const pathname = usePathname();

  const isCalendar = pathname === '/calendar';

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return (
    <div {...handlers} className="flex relative overflow-hidden">
      <LeftPanel id={id} />
      <div className="flex flex-col flex-1 relative border-collapse">
        <div className="flex border-collapse">
          <Days currentDate={currentDate} startDate={startDate} />
        </div>
        {isCalendar ? (
          <Reservations id={id} reservations={reservations} rooms={rooms} />
        ) : (
          <Prices id={id} rooms={rooms} prices={prices} />
        )}
      </div>
    </div>
  );
}
