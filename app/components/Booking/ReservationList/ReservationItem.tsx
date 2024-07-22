import React from 'react';
import { Database } from '@/types/supabase';
import useHandleSetFormData from '@/app/hooks/SearchResults/handleSetFormData';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import ReservationDetail from './ReservationDetail';

type Reservation = Database['public']['Tables']['reservations']['Row'];

interface ReservationItemProps {
  reservation: Reservation;
}

const ReservationItem: React.FC<ReservationItemProps> = ({ reservation }) => {
  const { handleSetFormData } = useHandleSetFormData();
  const { setIsEditing, setOverlay, setOpenSearchBar, setOverlaySearchBar } =
    useCalendarContext();
  const { setOpenAddReservationPanel } = useAddReservationContext();

  const startDate = new Date(reservation.selected_start_date);
  const endDate = new Date(reservation.selected_end_date);

  console.log(reservation);

  return (
    <div
      key={reservation.id}
      className="flex flex-col py-2 px-4 gap-2 hover:bg-gray-100 bg-white"
      onClick={() => {
        handleSetFormData(reservation);
        setIsEditing(true);
        setOverlaySearchBar(false);
        setOpenSearchBar(false);
        setOpenAddReservationPanel(true);
        setOverlay(true);
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: reservation.selected_status.color }}
        ></div>
        <p className="text-xs font-semibold">{reservation.main_guest}</p>
      </div>
      <div className="flex justify-between text-xs">
        <ReservationDetail
          label="Od"
          value={startDate.toISOString().substring(0, 10)}
        />
        <ReservationDetail
          label="Do"
          value={endDate.toISOString().substring(0, 10)}
        />
      </div>
      <ReservationDetail label="Telefon" value={reservation.phone} />
      <ReservationDetail label="Email" value={reservation.email} />
      <ReservationDetail label="ID" value={reservation.id} />
    </div>
  );
};

export default ReservationItem;
