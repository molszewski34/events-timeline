import React, { useState, useEffect } from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';
import SetPartialPrice from './SetPartialPrice/SetPartialPrice';

const SetPrices = ({ id }: { id: string }) => {
  const supabase = useSupabaseBrowser();

  const { data: rooms } = useQuery(fetchRooms(supabase, id));
  return <SetPartialPrice id="id" />;
};

export default SetPrices;
