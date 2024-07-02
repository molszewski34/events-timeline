'use client';
import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';

const SearchBar = () => {
  const { openSearchBar } = useCalendarContext();
  return (
    <>
      {openSearchBar && (
        <main className="absolute top-0 left-0 right-0 z-[60] bg-white w-full ">
          <input
            className="w-full h-16 pl-8"
            type="text"
            placeholder="Szukaj"
          />
        </main>
      )}
    </>
  );
};

export default SearchBar;
