import React from 'react';
import { Database } from '@/types/supabase';
import useHandleSetFormData from '@/app/hooks/SearchResults/handleSetFormData';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

type Reservation = Database['public']['Tables']['reservations']['Row'];

interface ReservationListProps {
  filteredReservations: Reservation[];
  activeTab: 'Najnowsze' | 'Anulowane';
}

const ReservationList: React.FC<ReservationListProps> = ({
  filteredReservations,
  activeTab,
}) => {
  const { handleSetFormData } = useHandleSetFormData();
  const { setIsEditing, setOverlay, setOpenSearchBar, setOverlaySearchBar } =
    useCalendarContext();
  const { setOpenAddReservationPanel } = useAddReservationContext();

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
            .map((reservation) => {
              const startDate = new Date(reservation.selected_start_date);
              const endDate = new Date(reservation.selected_end_date);
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
                      style={{
                        backgroundColor: reservation.selected_status.color,
                      }}
                    ></div>
                    <p className="text-xs font-semibold">
                      {reservation.main_guest}
                    </p>
                  </div>
                  <div className="flex justify-between text-xs ">
                    <div className="flex gap-2 basis-1/2">
                      <span className="text-gray-500 font-semibold">Od</span>
                      <p className="font-semibold">
                        {startDate.toISOString().substring(0, 10)}
                      </p>
                    </div>
                    <div className="flex gap-2 basis-1/2">
                      <span className="text-gray-500 font-semibold">Do</span>
                      <p className="font-semibold">
                        {endDate.toISOString().substring(0, 10)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-gray-500 font-semibold">Telefon</span>
                    <p className="font-semibold">{reservation.phone}</p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-gray-500 font-semibold">Email</span>
                    <p className="font-semibold">{reservation.email}</p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-gray-500 font-semibold">ID</span>
                    <p className="font-semibold">{reservation.id}</p>
                  </div>
                </div>
              );
            })
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
