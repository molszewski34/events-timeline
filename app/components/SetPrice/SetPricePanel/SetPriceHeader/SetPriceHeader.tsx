'use client';
import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { initialRoomFormData } from '@/app/contexts/AddRoom/initialRoomFormData';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

const SetPriceHeader = () => {
  const { setOpenSetPricePanel } = useSetPriceContext();
  const { setOverlay } = useCalendarContext();

  return (
    <header className="flex flex-col w-full bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-sm text-gray-500">Ustaw ceny</h1>
        <div className="flex gap-2 items-center relative    style={{ zIndex: 9999 }}">
          <button
            className="material-icon text-gray-700 rounded-full text-lg w-9 h-9 hover:bg-gray-100 text-center"
            onClick={() => {
              setOpenSetPricePanel(false);
              setOverlay(false);
            }}
          >
            close
          </button>
        </div>
      </div>
    </header>
  );
};

export default SetPriceHeader;
