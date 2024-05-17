'use client';
import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';

const Overlay = () => {
  const { overlay } = useCalendarContext();

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-[60] bg-black bg-opacity-50"
      style={{ display: overlay ? 'flex' : 'none' }}
    ></div>
  );
};

export default Overlay;
