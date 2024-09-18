import React, { useState, useEffect } from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';
import PriceSection from '@/app/components/PriceConfiguration/Preview/PriceSection';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import { fetchPriceSettings } from '@/app/actions/fetchPriceSettings';

const SetPartialPrice = ({ id }: { id: string }) => {
  const supabase = useSupabaseBrowser();

  const { data: rooms } = useQuery(fetchRooms(supabase, id));
  const { data: priceConfiguration, isLoading: isLoadingPriceConfig } =
    useQuery(fetchPriceSettings(supabase));

  const { priceFormData, setPriceFormData } = useSetPriceContext();

  const [maxNumOfPersons, setMaxNumOfPersons] = useState(0);
  const [priceSections, setPriceSections] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (priceFormData?.selectedRooms?.length > 0) {
      const maxPersons = priceFormData.selectedRooms.reduce(
        (max, room) => Math.max(max, room.num_of_persons || 0),
        0
      );
      setMaxNumOfPersons(maxPersons);
    }
  }, [priceFormData.selectedRooms]);

  useEffect(() => {
    if (maxNumOfPersons > 0 && priceConfiguration) {
      const sections = Array.from({ length: maxNumOfPersons }, (_, index) => (
        <PriceSection
          key={index}
          title={`Osoba dorosła (x${index + 1})`}
          readOnly={false}
          prices={[
            { label: 'Standard', price: 0, subLabel: '' },
            ...(priceConfiguration?.weekend_price
              ? [
                  {
                    label: 'Standard Weekend',
                    price: 0,
                  },
                ]
              : []),
            ...(priceConfiguration?.stay_duration
              ? [
                  {
                    label: 'Długi pobyt',
                    price: 0,
                    subLabel: `od ${priceConfiguration?.long_stay}`,
                  },
                ]
              : []),
            ...(priceConfiguration?.stay_duration
              ? [
                  {
                    label: 'Krótki pobyt',
                    price: 0,
                    subLabel: `do ${priceConfiguration?.short_stay}`,
                  },
                ]
              : []),
          ]}
        />
      ));

      const sortedSections = sections.reverse();
      setPriceSections(sortedSections);
    }
  }, [maxNumOfPersons, priceConfiguration]);

  if (isLoadingPriceConfig) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="">{priceSections}</div>
      <div className="">
        {priceConfiguration.child_price && (
          <>
            {priceConfiguration.age_ranges.map(
              (childAge: ChildAge) =>
                childAge.minAge !== null &&
                childAge.maxAge !== null && (
                  <PriceSection
                    key={`${childAge.minAge}-${childAge.maxAge}`}
                    title={`Dziecko (${childAge.minAge}-${childAge.maxAge})`}
                    readOnly={false}
                    prices={[
                      {
                        label: 'Standard',
                        price: 0,
                        subLabel: '',
                      },
                      ...(priceConfiguration.weekend_price
                        ? [
                            {
                              label: 'Standard Weekend',
                              price: 0,
                            },
                          ]
                        : []),
                      ...(priceConfiguration.stay_duration
                        ? [
                            {
                              label: 'Długi pobyt',
                              price: 0,
                              subLabel: `(od ${priceConfiguration.long_stay})`,
                            },
                          ]
                        : []),
                      ...(priceConfiguration.stay_duration
                        ? [
                            {
                              label: 'Krótki pobyt',
                              price: 0,
                              subLabel: `(do ${priceConfiguration.short_stay})`,
                            },
                          ]
                        : []),
                    ]}
                  />
                )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SetPartialPrice;
