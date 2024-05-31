'use client';
import React from 'react';
import { Button } from '@/app/components/ui/button';

import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
const Header = () => {
  const {
    setOpenAddReservationPanel,
    selectedButton,
    formData,
    selectedRoomId,
  } = useAddReservationContext();

  console.log(formData.mainGuest);

  const { setOverlay, isEditing, setIsEditing } = useCalendarContext();

  return (
    <header className="flex flex-col">
      <div className="flex justify-between items-center">
        {isEditing ? (
          <div className="flex flex-col">
            <h1 className="font-semibold text-base text-gray-500">
              {formData.mainGuest === '' ? 'Brak gościa' : formData.mainGuest}
            </h1>
            <span className=" text-sm text-gray-400">
              {formData.selectedRoomId}
            </span>
          </div>
        ) : (
          <h1 className="font-semibold text-sm text-gray-500">
            Dodaj rezerwacje
          </h1>
        )}

        <Button
          className="material-icon text-gray-700 text-2xl"
          variant={'ghost'}
          onClick={() => {
            setOpenAddReservationPanel(false);
            setOverlay(false);
            setIsEditing(false);
          }}
        >
          close
        </Button>
      </div>
      <div className="flex gap-4">
        <button className="bg-gray-200 text-xs p-1">
          {selectedButton.room?.name}
        </button>
        <button
          className="text-xs text-white p-1"
          style={{ backgroundColor: formData.selectedStatus.color }}
        >
          {formData.selectedStatus.name}
        </button>
      </div>
    </header>
  );
};

export default Header;
