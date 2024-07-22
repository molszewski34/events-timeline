import { useState, useEffect } from 'react';
import { Database } from '@/types/supabase';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchReservations } from '@/app/actions/fetchReservations';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';

type Reservation = Database['public']['Tables']['reservations']['Row'];

export const useReservations = (id: string, currentDate: Date, searchQuery: string) => {
  const supabase = useSupabaseBrowser();
  const { data: reservations, error } = useQuery(fetchReservations(supabase, id));

  const [filteredReservations, setFilteredReservations] = useState([])

  useEffect(() => {
    if (reservations) {
      const filtered = reservations.filter((reservation: Reservation) => {
        const reservationMonth = new Date(reservation.selected_start_date).getMonth();
        const reservationYear = new Date(reservation.selected_start_date).getFullYear();
        return (
          reservationMonth === currentDate.getMonth() &&
          reservationYear === currentDate.getFullYear()
        );
      });

      if (searchQuery) {
        const searched = filtered.filter((reservation) => 
          reservation.main_guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reservation.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reservation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reservation.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredReservations(searched);
      } else {
        setFilteredReservations(filtered);
      }
    }
  }, [currentDate, reservations, searchQuery]);

  return { filteredReservations, error };
};
