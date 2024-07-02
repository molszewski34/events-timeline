'use client';
import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';

const OverlaySearchBar = () => {
  const { overlaySearchBar, setOverlaySearchBar, setOpenSearchBar } =
    useCalendarContext();
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-[50] bg-black bg-opacity-50"
      style={{ display: overlaySearchBar ? 'flex' : 'none' }}
      onClick={() => {
        setOverlaySearchBar(false);
        setOpenSearchBar(false);
      }}
    ></div>
  );
};

export default OverlaySearchBar;
