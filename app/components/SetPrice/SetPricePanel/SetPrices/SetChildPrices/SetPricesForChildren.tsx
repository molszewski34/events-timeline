import React, { useState, useEffect } from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import useSupabaseBrowser from '@/utils/supabase-browser';

import PriceSection from '@/app/components/PriceConfiguration/Preview/PriceSection';

import { fetchPriceSettings } from '@/app/actions/fetchPriceSettings';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
const SetPricesForChildren = () => {
  const supabase = useSupabaseBrowser();
  const { data: priceConfiguration, isLoading: isLoadingPriceConfig } =
    useQuery(fetchPriceSettings(supabase));

  const { priceFormData, setPriceFormData } = useSetPriceContext();

  useEffect(() => {
    if (priceConfiguration?.child_price && priceConfiguration?.age_ranges) {
      const initialPrices = priceConfiguration.age_ranges.map(() => ({
        standard: 0,
        standardWeekend: 0,
        longStay: 0,
        shortStay: 0,
      }));
      setPriceFormData((prevData) => ({
        ...prevData,
        partialPricesForChildrens: initialPrices,
      }));
    }
  }, [priceConfiguration]);

  const handleInputChange = (index, field, value) => {
    const newPrices = [...priceFormData.partialPricesForChildrens];
    newPrices[index][field] = parseFloat(value) || 0;

    setPriceFormData((prevData) => ({
      ...prevData,
      partialPricesForChildrens: newPrices,
    }));
  };

  return (
    <div className="">
      {priceConfiguration?.child_price &&
        priceConfiguration?.age_ranges.map((childAge, index) =>
          childAge.minAge !== null && childAge.maxAge !== null ? (
            <PriceSection
              key={`${childAge.minAge}-${childAge.maxAge}`}
              title={`Dziecko (${childAge.minAge}-${childAge.maxAge})`}
              readOnly={false}
              prices={[
                {
                  label: 'Standard',
                  price:
                    priceFormData.partialPricesForChildrens[index]?.standard ||
                    0,
                  field: 'standard',
                },
                ...(priceConfiguration.weekend_price
                  ? [
                      {
                        label: 'Standard Weekend',
                        price:
                          priceFormData.partialPricesForChildrens[index]
                            ?.standardWeekend || 0,
                        field: 'standardWeekend',
                      },
                    ]
                  : []),
                ...(priceConfiguration.stay_duration
                  ? [
                      {
                        label: 'Długi pobyt',
                        price:
                          priceFormData.partialPricesForChildrens[index]
                            ?.longStay || 0,
                        field: 'longStay',
                        subLabel: `(od ${priceConfiguration.long_stay})`,
                      },
                    ]
                  : []),
                ...(priceConfiguration.stay_duration
                  ? [
                      {
                        label: 'Krótki pobyt',
                        price:
                          priceFormData.partialPricesForChildrens[index]
                            ?.shortStay || 0,
                        field: 'shortStay',
                        subLabel: `(do ${priceConfiguration.short_stay})`,
                      },
                    ]
                  : []),
              ]}
              onInputChange={(field, value) =>
                handleInputChange(index, field, value)
              }
            />
          ) : null
        )}
    </div>
  );
};

export default SetPricesForChildren;
