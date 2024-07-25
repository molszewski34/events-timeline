import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';

const ClientDetails = ({ openDetails, setOpenDetails }) => {
  console.log(openDetails);
  const { setOverlay } = useCalendarContext();
  return (
    <>
      {openDetails && (
        <main className="fixed inset-0 flex flex-col items-center justify-center z-[99] pt-0 px-4 pb-5 ">
          <div className=" bg-white fixed  w-[95vw] max-w-[95vh] p-4 shadow-lg rounded-md">
            <div className="flex  justify-between pb-3">
              <p className="text-lg font-semibold">Gość</p>
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
                      <b>Gość</b> <b>Pokój 1</b>
                    </div>
                    <button className="material-icon text-gray-400 text-lg">
                      edit
                    </button>
                  </div>
                </div>
                <div className="flex flex-col text-gray-500 font-light mt-4">
                  <div className="flex">
                    <i className="grow-0 min-w-32">subdirectory_arrow_right</i>
                    <p className="grow">2024-06-28</p>
                  </div>
                  <div className="flex">
                    <i className="grow-0 min-w-32">subdirectory_arrow_left</i>
                    <p className="grow">2024-06-28</p>
                  </div>
                  <div className="flex">
                    <p className="grow-0 min-w-32">Ilość dni</p>
                    <p className="grow">2024-06-28</p>
                  </div>
                  <div className="flex">
                    <i className="grow-0 min-w-32">calendar_today</i>
                    <p className="grow">2024-06-28</p>
                  </div>
                  <div className="flex">
                    <i className="grow-0 min-w-32">attach_money</i>
                    <p className="grow">2024-06-28</p>
                  </div>
                  <div className="flex">
                    <p className="grow-0 min-w-32">ID</p>
                    <p className="grow">2024-06-28</p>
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
