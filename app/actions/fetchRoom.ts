import { TypedSupabaseClient } from '@/utils/types'

export function fetchRooms(client: TypedSupabaseClient, id: string) {
  return client
    .from('rooms')
    .select(`*`)
  
}