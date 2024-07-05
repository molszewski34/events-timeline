'use client';

import { createContext, useContext, useState } from 'react';
import { addDays, startOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchReservations } from '@/app/actions/fetchReservations';
import useSupabaseBrowser from '@/utils/supabase-browser';

const CalendarContext = createContext<any>(undefined);
export function CalendarWrapper({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const supabase = useSupabaseBrowser();

  const { data: reservations } = useQuery(fetchReservations(supabase, id));
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [daysToShow, setDaysToShow] = useState(14);
  const [maxWeeksToShow, setMaxWeeksToShow] = useState(2);
  const [startDate, setStartDate] = useState<Date>(
    startOfWeek(startOfMonth(currentDate), { locale: pl })
  );
  const [endDate, setEndDate] = useState<Date>(
    addDays(startOfWeek(endOfMonth(currentDate), { locale: pl }), daysToShow)
  );
  const [overlay, setOverlay] = useState(false);
  const [overlayDelete, setOverlayDelete] = useState(false);
  const [clickOutside, setClickOutside] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingRoom, setIsDeletingRoom] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [overlaySearchBar, setOverlaySearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReservations, setFilteredReservations] = useState(
    reservations || []
  );
  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        daysToShow,
        setDaysToShow,
        maxWeeksToShow,
        setMaxWeeksToShow,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        overlay,
        setOverlay,
        overlayDelete,
        setOverlayDelete,
        clickOutside,
        setClickOutside,
        isEditing,
        setIsEditing,
        isDeleting,
        setIsDeleting,
        isDeletingRoom,
        setIsDeletingRoom,
        openSearchBar,
        setOpenSearchBar,
        overlaySearchBar,
        setOverlaySearchBar,
        searchQuery,
        setSearchQuery,
        filteredReservations,
        setFilteredReservations,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  return useContext(CalendarContext);
}
