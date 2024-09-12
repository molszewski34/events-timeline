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

  const [maxNumOfPersons, setMaxNumOfPersons] = useState(0);

  const [priceSections, setPriceSections] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (priceFormData.selectedRooms.length > 0) {
      const maxPersons = priceFormData.selectedRooms.reduce(
        (max, room) => Math.max(max, room.num_of_persons || 0),
        0
      );
      setMaxNumOfPersons(maxPersons);
    }
  }, [priceFormData.selectedRooms]);

  useEffect(() => {
    if (maxNumOfPersons > 0) {
      const sections = Array.from({ length: maxNumOfPersons }, (_, index) => (
        <PriceSection
          key={index}
          title={`Osoba dorosła (x${index + 1})`}
          prices={[]}
        />
      ));

      const sortedSections = sections.reverse();

      setPriceSections(sortedSections);
    }
  }, [maxNumOfPersons]);

  return <>{priceSections}</>;
};

export default SetPartialPrice;