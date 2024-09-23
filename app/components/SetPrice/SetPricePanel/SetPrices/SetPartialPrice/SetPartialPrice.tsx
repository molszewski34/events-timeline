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
  const [partialPrices, setPartialPrices] = useState([]);

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
      const initialPrices = Array.from({ length: maxNumOfPersons }, () => ({
        standard: 0,
        standardWeekend: 0,
        longStay: 0,
        shortStay: 0,
      })).reverse();

      setPartialPrices(initialPrices);
    }
  }, [maxNumOfPersons, priceConfiguration]);

  const handleInputChange = (index, field, value) => {
    const newData = [...partialPrices];
    newData[index][field] = parseFloat(value) || 0;
    setPartialPrices(newData);
  };

  if (isLoadingPriceConfig) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="">
        {partialPrices.map((price, index) => (
          <PriceSection
            key={index}
            title={`Osoba dorosła (x${maxNumOfPersons - index})`}
            readOnly={false}
            prices={[
              {
                label: 'Standard',
                price: price.standard,
                field: 'standard',
              },
              ...(priceConfiguration?.weekend_price
                ? [
                    {
                      label: 'Standard Weekend',
                      price: price.standardWeekend,
                      field: 'standardWeekend',
                    },
                  ]
                : []),
              ...(priceConfiguration?.stay_duration
                ? [
                    {
                      label: 'Długi pobyt',
                      price: price.longStay,
                      field: 'longStay',
                      subLabel: `od ${priceConfiguration?.long_stay}`,
                    },
                  ]
                : []),
              ...(priceConfiguration?.stay_duration
                ? [
                    {
                      label: 'Krótki pobyt',
                      price: price.shortStay,
                      field: 'shortStay',
                      subLabel: `do ${priceConfiguration?.short_stay}`,
                    },
                  ]
                : []),
            ]}
            onInputChange={(field, value) =>
              handleInputChange(index, field, value)
            }
          />
        ))}
      </div>
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
                    onInputChange={(field, value) =>
                      handleInputChange(index, field, value)
                    }
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
