'use client';
import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';

const ClickOutside = () => {
  const { clickOutside, setClickOutside } = useCalendarContext();
  const { setOpenDeletePopup } = useAddRoomContext();
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-[80] bg-black bg-opacity-0"
      style={{ display: clickOutside ? 'flex' : 'none' }}
      onClick={() => {
        setClickOutside(false);
        setOpenDeletePopup(false);
      }}
    ></div>
  );
};

export default ClickOutside;
