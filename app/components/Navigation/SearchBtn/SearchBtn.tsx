'use client';
import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
const SearchBtn = () => {
  const { openSearchBar, setOpenSearchBar, setOverlaySearchBar } =
    useCalendarContext();
  return (
    <button
      className="w-11"
      onClick={() => {
        setOpenSearchBar(true);
        setOverlaySearchBar(true);
      }}
    >
      <i className="text-2xl">search</i>
    </button>
  );
};

export default SearchBtn;
