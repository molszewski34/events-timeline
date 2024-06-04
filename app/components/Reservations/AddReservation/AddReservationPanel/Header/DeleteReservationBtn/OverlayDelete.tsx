'use client';
import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';

const OverlayDelete = () => {
  const { overlayDelete } = useCalendarContext();

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-[998] bg-black bg-opacity-50"
      style={{ display: overlayDelete ? 'flex' : 'none' }}
    ></div>
  );
};

export default OverlayDelete;
