
import { createClient } from '@/utils/supabase/server';
import { fetchPriceSettings } from '@/app/actions/fetchPriceSettings';

export const getPriceSettings = async () => {
  const supabase = createClient();

  const { data, error } = await fetchPriceSettings(supabase);

  if (error) {
    console.error('Error fetching price settings:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
};
