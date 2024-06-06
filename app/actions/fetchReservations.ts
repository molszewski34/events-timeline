import { TypedSupabaseClient } from '@/utils/types'

export function fetchReservations(client: TypedSupabaseClient, id: string) {
  return client
    .from('reservations')
    .select(`*`)
    .order('selected_start_date', { ascending: true });
}