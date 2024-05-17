'use client';
import React from 'react';
import { Button } from '@/app/components/ui/button';

import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
const Header = () => {
  const { setOpenAddReservationPanel, selectedButton, formData } =
    useAddReservationContext();

  return (
    <header className="flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-sm text-gray-500">
          Dodaj rezerwacje
        </h1>
        <Button
          className="material-icon text-gray-700 text-2xl"
          variant={'ghost'}
          onClick={() => setOpenAddReservationPanel(false)}
        >
          close
        </Button>
      </div>
      <div className="flex gap-4">
        <button className="bg-gray-200 text-xs p-1">
          {selectedButton.room?.roomName}
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
