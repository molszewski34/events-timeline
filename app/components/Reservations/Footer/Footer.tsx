'use client';
import { useState } from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
const Footer = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { openAddRoom, setOpenAddRoom } = useAddRoomContext();
  const { overlay, setOverlay } = useCalendarContext();
  return (
    <footer className="fixed bottom-0 flex justify-end w-full">
      {isClicked ? (
        <div className="flex flex-col gap-2">
          <button
            className="material-icon rounded-full py-2 px-3 bg-gray-700 flex shadow-lg mr-4 mb-2 text-2xl text-white relative "
            onClick={() => setIsClicked(!isClicked)}
          >
            close
          </button>
          <div className="flex flex-col absolute top-[-4em] right-2 w-[170px] bg-white text-black shadow-sm rounded-sm gap-2 py-1">
            <button
              className="flex gap-2 bg-white px-1 py-3 hover:bg-gray-100 text-green-500"
              onClick={() => {
                setOpenAddRoom(true);
                setOverlay(true);
                setIsClicked(false);
              }}
            >
              <i className="material-icon text-lg">house</i>
              <p className="">Dodaj pokój</p>
            </button>
          </div>
        </div>
      ) : (
        <button
          className="material-icon rounded-full py-3 px-4 bg-white flex shadow-lg mr-4 mb-2 text-xl text-green-600"
          onClick={() => setIsClicked(!isClicked)}
        >
          more_vert
        </button>
      )}
    </footer>
  );
};

export default Footer;
