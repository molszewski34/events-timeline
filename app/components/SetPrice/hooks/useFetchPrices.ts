import { fetchPrices } from '@/app/actions/fetchPrices';
import { useQuery } from '@tanstack/react-query';
import useSupabaseBrowser from '@/utils/supabase-browser';

function useFetchPrices(selectedRooms: { id: string }[]) {
  const supabase = useSupabaseBrowser();

  const { data: pricesResponse } = useQuery({
    queryKey: ['fetchPrices', selectedRooms],
    queryFn: () => fetchPrices(supabase),
    enabled: Boolean(selectedRooms?.length),
  });

  return pricesResponse?.data;
}

export default useFetchPrices;
