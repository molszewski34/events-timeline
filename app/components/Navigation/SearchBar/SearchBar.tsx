'use client';
import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchReservations } from '@/app/actions/fetchReservations';
import useSupabaseBrowser from '@/utils/supabase-browser';
import NoResults from './SearchResult/NoResults';
import SearchResult from './SearchResult/SearchResult';

const SearchBar = ({ id }: { id: string }) => {
  const supabase = useSupabaseBrowser();

  const { data: reservations } = useQuery(fetchReservations(supabase, id));

  const {
    openSearchBar,
    searchQuery,
    setSearchQuery,
    filteredReservations,
    setFilteredReservations,
  } = useCalendarContext();

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = reservations.filter((reservation) => {
      const { phone, email, id, main_guest } = reservation;

      return (
        phone.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query) ||
        id.toString().toLowerCase().includes(query) ||
        main_guest.toLowerCase().includes(query)
      );
    });

    if (query === '') {
      setFilteredReservations([]);
    } else {
      setFilteredReservations(filtered);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredReservations([]);
  };
  return (
    <>
      {openSearchBar && (
        <main className="absolute top-0 left-0 right-0 z-[60] bg-white w-full ">
          <div className="relative w-full h-16">
            <input
              className="w-full h-full pl-8 pr-16 text-gray-600"
              type="text"
              placeholder="Szukaj"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button
              className="absolute right-0 top-0 h-full px-4"
              onClick={handleClear}
            >
              <i className="text-lg text-gray-500">close</i>
            </button>
          </div>
          {searchQuery && filteredReservations.length === 0 && <NoResults />}
          {filteredReservations.length > 0 && <SearchResult />}
        </main>
      )}
    </>
  );
};

export default SearchBar;
