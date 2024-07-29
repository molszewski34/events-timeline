import { useState, useEffect } from 'react';
import { Database } from '@/types/supabase';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchReservations } from '@/app/actions/fetchReservations';
import useSupabaseBrowser from '@/utils/supabase-browser';

type Reservation = Database['public']['Tables']['reservations']['Row'];
const useClients = (id: string, searchQuery: string) => {
  const supabase = useSupabaseBrowser();
  const { data: reservations, error } = useQuery(fetchReservations(supabase, id));

  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);

  console.log(filteredReservations);

  useEffect(() => {
    if (reservations) {
      const searched = reservations.filter((reservation) => 
        reservation.main_guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.id.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const sorted = searched.sort((a, b) => a.main_guest.localeCompare(b.main_guest));

      setFilteredReservations(sorted);
    }
  }, [reservations, searchQuery]);

  return { filteredReservations, error };
}

export default useClients;
