'use client';
import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { initialRoomFormData } from '@/app/contexts/AddRoom/initialRoomFormData';
import DeleteBtn from './DeleteRoomBtn';

const Header = () => {
  const {
    setOpenAddRoom,
    setRoomFormData,
    openDeletePopup,
    setOpenDeletePopup,
  } = useAddRoomContext();
  const { setOverlay, setIsEditing, isEditing, setClickOutside } =
    useCalendarContext();
  const resetRoomFormData = () => {
    setRoomFormData(initialRoomFormData);
  };

  return (
    <header className="flex flex-col w-full bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-sm text-gray-500">
          {isEditing ? 'Edycja pokoju' : 'Dodaj pokój'}
        </h1>
        <div className="flex gap-2 items-center relative    style={{ zIndex: 9999 }}">
          <button
            className="material-icon text-gray-700 rounded-full text-lg w-9 h-9 hover:bg-gray-100 text-center items-center"
            onClick={() => {
              setOpenDeletePopup(true);
              setClickOutside(true);
            }}
          >
            more_vert
          </button>
          {openDeletePopup && <DeleteBtn />}
          <button
            className="material-icon text-gray-700 rounded-full text-lg w-9 h-9 hover:bg-gray-100 text-center"
            onClick={() => {
              setOpenAddRoom(false);
              setOverlay(false);
              resetRoomFormData();
              setIsEditing(false);
            }}
          >
            close
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
