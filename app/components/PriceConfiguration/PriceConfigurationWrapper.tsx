'use client';

import React, { useEffect } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import CurrencyDropdownList from '@/app/components/PriceConfiguration/CurrencyDropDownList/CurrencyDropDownList';
import ToggleSwitchButtonsPanel from '@/app/components/PriceConfiguration/ToggleSwitchButtonsPanel/ToggleSwitchButtonsPanel';
import SectionHeader from '@/app/components/utils/SectionHeader';
import Preview from '@/app/components/PriceConfiguration/Preview/Preview';
import SubmitBtn from '@/app/components/PriceConfiguration/SubmitBtn/SubmitBtn';
import { PriceConfigurationProps } from './types/PriceSettings';

const PriceConfigurationWrapper: React.FC<PriceConfigurationProps> = ({
  data,
}) => {
  const { priceSettings, setPriceSettings } = usePriceConfigurationContext();

  useEffect(() => {
    if (data) {
      setPriceSettings({
        id: data.id,
        isReminding: data.isReminding,
        partialOccupancyPrice: data.partial_occupancy_price,
        weekendPrice: data.weekend_price,
        stayDuration: data.stay_duration,
        childPrice: data.child_price,
        mealPrice: data.meal_price,
        localTax: data.local_tax,
        localTaxAmount: data.local_tax_amount,
        bookingRestrictions: data.booking_restrictions,
        selectedCurrency: data.selected_currency,
        selectedMinAge: data.selected_min_age,
        selectedMaxAge: data.selected_max_age,
        addCostToAdult: data.add_cost_to_adult,
        localTaxForChild: data.local_tax_for_child,
        minAgeListOpen: data.min_age_list_open,
        maxAgeListOpen: data.max_age_list_open,
        ageRanges: data.age_ranges,
        longStay: data.long_stay,
        shortStay: data.short_stay,
        mealPrices: data.meal_prices,
        mealIncluded: data.meal_included,
        focusedField: data.focused_field,
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center bg-white mt-6 mx-2 border border-gray-300 border-b-0 py-1 rounded-md relative">
      <div className="flex flex-col px-2 w-full gap-4">
        <div className="flex flex-col justify-between p-2 gap-2">
          <header className="flex bg-white w-full">
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold">Konfiguracja cennika</p>
            </div>
          </header>

          <div className="flex flex-col gap-3">
            {priceSettings.isReminding && (
              <div className="flex gap-3 items-center bg-[#fdecea] rounded-sm py-2 px-4 w-full mt-2">
                <i className="text-red-400 text-2xl">error</i>
                <p className="text-red-900 text-sm font-normal">
                  Aby przejść do ustawienia cen zapisz konfigurację cennika.
                </p>
              </div>
            )}
            <SectionHeader title="Waluta" />
            <CurrencyDropdownList />
            <SectionHeader title="Preferencje" />
            <ToggleSwitchButtonsPanel data={data} />
            <Preview data={data} />
            <SubmitBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceConfigurationWrapper;
