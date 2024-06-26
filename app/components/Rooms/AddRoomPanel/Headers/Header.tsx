'use client';
import React from 'react';
import { Button } from '@/app/components/ui/button';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
const Header = () => {
  const { setOpenAddRoom } = useAddRoomContext();
  const { setOverlay } = useCalendarContext();

  return (
    <header className="flex flex-col  w-full bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-sm text-gray-500">Dodaj Pokój</h1>
        <button
          className="material-icon text-gray-700 rounded-full text-lg w-9 h-9 text-right"
          // variant={'ghost'}
          onClick={() => {
            setOpenAddRoom(false);
            setOverlay(false);
          }}
        >
          close
        </button>
      </div>
    </header>
  );
};

export default Header;
