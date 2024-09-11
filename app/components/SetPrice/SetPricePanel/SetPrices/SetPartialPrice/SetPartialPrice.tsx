import React, { useState, useEffect } from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';
import PriceSection from '@/app/components/PriceConfiguration/Preview/PriceSection';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

const SetPartialPrice = ({ id }: { id: string }) => {
  const supabase = useSupabaseBrowser();

  const { data: rooms } = useQuery(fetchRooms(supabase, id));

  const { priceFormData, setPriceFormData } = useSetPriceContext();
  const numOfPersons = priceFormData.selectedRooms[0].num_of_persons || 0; // Sprawdzamy, czy wartość istnieje

  console.log(numOfPersons);

  return (
    <>
      {Array.from({ length: numOfPersons }).map((_, index) => (
        <PriceSection
          key={index}
          title={`Osoba dorosła (${index + 1})`}
          prices={[]}
        />
      ))}
    </>
  );
};

export default SetPartialPrice;
