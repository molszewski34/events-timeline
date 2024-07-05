import { useCallback } from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { Reservation } from '@/app/components/RenderRows/types';
import useHandleSetFormData from '@/app/hooks/SearchResults/handleSetFormData';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

const SearchResult = () => {
  const {
    filteredReservations,
    setIsEditing,
    setOverlay,
    setOpenSearchBar,
    setOverlaySearchBar,
  } = useCalendarContext();

  const {
    setFormData,
    formData,
    setOpenAddReservationPanel,
    openAddReservationPanel,
  } = useAddReservationContext();

  const { handleSetFormData } = useHandleSetFormData();
  return (
    <main>
      <div className="flex justify-between py-2 px-4 text-xs bg-gray-200">
        <p className="text-gray-600">Wyniki wyszukiwania</p>
        <span className="flex bg-gray-300 w-5 h-5 justify-center items-start rounded-sm">
          {filteredReservations.length}
        </span>
      </div>
      <div className="">
        {filteredReservations.map((query: Reservation) => {
          const startDate = new Date(query.selected_start_date);
          const endDate = new Date(query.selected_end_date);

          return (
            <div
              key={query.id}
              className="flex flex-col py-2 px-4 gap-2 hover:bg-gray-100"
              onClick={() => {
                handleSetFormData(query);
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
                  style={{ backgroundColor: query.selected_status.color }}
                ></div>
                <p className="text-xs font-semibold"> {query.main_guest}</p>
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
                <p className="font-semibold"> {query.phone}</p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="text-gray-500 font-semibold">Email</span>
                <p className="font-semibold"> {query.email}</p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="text-gray-500 font-semibold">ID</span>
                <p className="font-semibold"> {query.id}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default SearchResult;
