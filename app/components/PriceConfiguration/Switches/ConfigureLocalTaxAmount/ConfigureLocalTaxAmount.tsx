import React, { useState } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import ToggleSwitchComponent from '../../ToggleSwitchButton/ToggleSwitchButton';
const ConfigureLocalTaxAmount = () => {
  const { selectedCurrency, addCostToAdult, setAddCostToAdult } =
    usePriceConfigurationContext();

  const handleAddCostToAdult = (value: boolean) => {
    setAddCostToAdult(value);
  };

  return (
    <div className="flex flex-col p-3 border-2 border-gray-200 rounded-sm mt-3 gap-2">
      <div className="flex flex-col gap-2">
        <label className="text-gray-600 text-sm">
          Kwota podatku lokalnego za osoby dorosłe
        </label>
        <div className="flex items-center border border-gray-200 rounded-sm focus-within:border-green-600 text-xs">
          <input
            type="text"
            className="flex-grow p-2 focus:outline-none text-right"
          />
          <span className="p-2 text-gray-400">{selectedCurrency}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-sm">
            Doba od której naliczany jest podatek lokalny
          </label>
          <div className="flex items-center border border-gray-200 rounded-sm focus-within:border-green-600 text-xs">
            <input
              type="text"
              className="flex-grow p-2 focus:outline-none "
              defaultValue={1}
            />
          </div>
        </div>
        <ToggleSwitchComponent
          onToggle={handleAddCostToAdult}
          question="W cenie"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-600 text-sm">
          Kwota podatku lokalnego za dzieci
        </label>
        <div className="flex items-center border border-gray-200 rounded-sm focus-within:border-green-600 text-xs">
          <input
            type="text"
            className="flex-grow p-2 focus:outline-none text-right"
          />
          <span className="p-2 text-gray-400">{selectedCurrency}</span>
        </div>
      </div>
    </div>
  );
};

export default ConfigureLocalTaxAmount;
