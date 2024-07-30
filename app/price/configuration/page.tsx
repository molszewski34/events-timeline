'use client';
import React from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import CurrencyDropdownList from '@/app/components/PriceConfiguration/CurrencyDropDownList/CurrencyDropDownList';
import ToggleSwitchButtonsPanel from '@/app/components/PriceConfiguration/ToggleSwitchButtonsPanel/ToggleSwitchButtonsPanel';
const Page = () => {
  const { isReminding } = usePriceConfigurationContext();
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
            {isReminding && (
              <div className="flex gap-3 items-center bg-[#fdecea] rounded-sm py-2 px-4 w-full mt-2">
                <i className="text-red-400 text-2xl">error</i>
                <p className="text-red-900 text-sm font-normal">
                  Aby przejść do ustawienia cen zapisz konfigurację cennika.
                </p>
              </div>
            )}
            <header className="text-gray-500 text-sm font-semibold border-b border-gray-200 pb-2">
              Waluta
            </header>
            <CurrencyDropdownList />
            <ToggleSwitchButtonsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
