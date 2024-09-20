import React, { useState, useEffect } from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import useSupabaseBrowser from '@/utils/supabase-browser';

import PriceSection from '@/app/components/PriceConfiguration/Preview/PriceSection';

import { fetchPriceSettings } from '@/app/actions/fetchPriceSettings';

const SetPricesForChildren = () => {
  const supabase = useSupabaseBrowser();
  const { data: priceConfiguration, isLoading: isLoadingPriceConfig } =
    useQuery(fetchPriceSettings(supabase));
  return (
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
  );
};

export default SetPricesForChildren;
