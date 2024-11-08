import React, { useState, useEffect } from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';
import PriceSection from '@/app/components/PriceConfiguration/Preview/PriceSection';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { fetchPriceSettings } from '@/app/actions/fetchPriceSettings';
import SetPricesForChildren from '../SetChildPrices/SetPricesForChildren';
import RecalculatePrices from '../../RecalculatePrices/RecalculatePrices';

const SetPartialPrice = ({ id }: { id: string }) => {
  const supabase = useSupabaseBrowser();

  const { priceFormData, setPriceFormData, selectedRooms } =
    useSetPriceContext();

  const { data: priceConfiguration, isLoading: isLoadingPriceConfig } =
    useQuery(fetchPriceSettings(supabase));

  const [maxNumOfPersons, setMaxNumOfPersons] = useState(0);

  useEffect(() => {
    if (selectedRooms?.length > 0) {
      const maxPersons = selectedRooms.reduce(
        (max, room) => Math.max(max, room.num_of_persons || 0),
        0
      );
      setMaxNumOfPersons(maxPersons);
    } else {
      setMaxNumOfPersons(0);
      setPriceFormData((prevData) => ({
        ...prevData,
        partialPrices: [],
      }));
    }
  }, [selectedRooms]);

  useEffect(() => {
    if (maxNumOfPersons > 0 && priceConfiguration) {
      const initialPrices = Array.from({ length: maxNumOfPersons }, () => ({
        standard: 0,
        standardWeekend: 0,
        longStay: 0,
        shortStay: 0,
      })).reverse();

      setPriceFormData((prevData) => ({
        ...prevData,
        partialPrices: initialPrices,
      }));
    }
  }, [maxNumOfPersons, priceConfiguration]);

  const handleInputChange = (index, field, value) => {
    const newData = [...priceFormData.partialPrices];
    newData[index][field] = parseFloat(value) || 0;

    setPriceFormData((prevData) => ({
      ...prevData,
      partialPrices: newData,
    }));
  };

  if (isLoadingPriceConfig) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="">
        {priceFormData.partialPrices.map((price, index) => (
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
      <SetPricesForChildren />
      <RecalculatePrices />
    </div>
  );
};

export default SetPartialPrice;
