import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { differenceInDays, parseISO } from 'date-fns';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { Database } from '@/types/supabase';
import useHandleSetFormData from '@/app/hooks/SearchResults/handleSetFormData';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

const ClientDetails = ({
  openDetails,
  setOpenDetails,
  selectedReservation,
  id,
}) => {
  const { setIsEditing, setOverlay, setOpenSearchBar, setOverlaySearchBar } =
    useCalendarContext();

  const { setOpenAddReservationPanel } = useAddReservationContext();

  const supabase = useSupabaseBrowser();
  const { data: rooms } = useQuery(fetchRooms(supabase, id));
  type Room = Database['public']['Tables']['rooms']['Row'];

  const selectedRoom = rooms?.find(
    (room: Room) => room.id === selectedReservation.room_id
  );

  console.log(selectedReservation.id);

  const { handleSetFormData } = useHandleSetFormData();

  const startDate = selectedReservation
    ? parseISO(selectedReservation.selected_start_date)
    : null;
  const endDate = selectedReservation
    ? parseISO(selectedReservation.selected_end_date)
    : null;
  const dayDifference =
    startDate && endDate ? differenceInDays(endDate, startDate) : null;

  return (
    <>
      {openDetails && (
        <main className="fixed inset-0 flex flex-col items-center justify-center z-[99] pt-0 px-4 pb-5 ">
          <div className=" bg-white fixed  w-[90vw] max-w-[90vh] p-4 shadow-lg rounded-md">
            <div className="flex  justify-between pb-3">
              <p className="text-lg font-semibold">
                {selectedReservation.main_guest}
              </p>
              <button
                className="material-icon text-lg text-gray-500"
                onClick={() => {
                  setOpenDetails(false);
                  setOverlay(false);
                }}
              >
                close
              </button>
            </div>

            <header className="text-gray-500 text-sm font-semibold border-b pb-2">
              Rezerwacje
            </header>
            <div className="flex gap-4 mt-4">
              <div className="flex justify-center items-center w-8 h-8 bg-green-600 rounded-full ">
                <i className="text-white px-2">calendar_today</i>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex gap-4 items-start">
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col text-sm">
                      <b>{selectedReservation.main_guest}</b>
                      <b>Pokój: {selectedRoom?.name || 'N/A'}</b>{' '}
                    </div>
                    <button
                      className="material-icon text-gray-400 text-lg"
                      onClick={() => {
                        handleSetFormData(selectedReservation);
                        setIsEditing(true);
                        setOverlaySearchBar(false);
                        setOpenSearchBar(false);
                        setOpenAddReservationPanel(true);
                        setOverlay(true);
                        setOpenDetails(false);
                      }}
                    >
                      edit
                    </button>
                  </div>
                </div>
                <div className="flex flex-col text-gray-500 font-light mt-4">
                  <div className="flex">
                    <i className="grow-0 min-w-32">subdirectory_arrow_right</i>
                    <p className="grow">
                      {selectedReservation?.selected_start_date}
                    </p>
                  </div>
                  <div className="flex">
                    <i className="grow-0 min-w-32">subdirectory_arrow_left</i>
                    <p className="grow">
                      {selectedReservation?.selected_end_date}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="grow-0 min-w-32">Ilość dni</p>
                    <p className="grow">
                      {dayDifference !== null ? dayDifference : 'N/A'}
                    </p>
                  </div>
                  <div className="flex">
                    <i className="grow-0 min-w-32">calendar_today</i>
                    <p className="grow">{selectedReservation.created_at}</p>
                  </div>
                  <div className="flex">
                    <i className="grow-0 min-w-32">attach_money</i>
                    <p className="grow">--</p>
                  </div>
                  <div className="flex">
                    <p className="grow-0 min-w-32">ID</p>
                    <p className="grow">{selectedReservation?.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default ClientDetails;
