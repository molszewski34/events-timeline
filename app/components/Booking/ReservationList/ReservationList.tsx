import React from 'react';
import { Database } from '@/types/supabase';
import ReservationItem from './ReservationItem';

type Reservation = Database['public']['Tables']['reservations']['Row'];

interface ReservationListProps {
  filteredReservations: Reservation[];
  activeTab: 'Najnowsze' | 'Anulowane';
}

const ReservationList: React.FC<ReservationListProps> = ({
  filteredReservations,
  activeTab,
}) => {
  return (
    <div className="w-full bg-gray-100">
      <ul className="flex flex-col gap-2">
        {filteredReservations.length > 0 ? (
          filteredReservations
            .filter((reservation) =>
              activeTab === 'Najnowsze'
                ? reservation.selected_status.name !== 'Anulowana'
                : reservation.selected_status.name === 'Anulowana'
            )
            .map((reservation) => (
              <ReservationItem key={reservation.id} reservation={reservation} />
            ))
        ) : (
          <div className="bg-white py-6 text-gray-700 font-normal flex flex-col items-center rounded-b-sm border-b border-t-0 border-gray-300">
            <i>calendar_today</i>
            <p>Brak rezerwacji w tym miesiącu</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ReservationList;
