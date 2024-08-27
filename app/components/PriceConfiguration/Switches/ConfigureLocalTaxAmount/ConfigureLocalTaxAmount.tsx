import React, { ChangeEvent } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import ToggleSwitchComponent from '../../ToggleSwitchButton/ToggleSwitchButton';
import AdultTaxInput from './AdultTaxInput';
import AgeRangeInputs from './AgeRangeInputs';
import { PriceConfiguration } from '@/app/contexts/PriceConfiguration/types';

const ConfigureLocalTaxAmount: React.FC = () => {
  const { priceSettings, setPriceSettings } = usePriceConfigurationContext();

  const handleAddCostToAdult = (value: boolean) => {
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      addCostToAdult: value,
    }));
  };

  const handleTaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue)) {
      setPriceSettings((prevSettings: PriceConfiguration) => ({
        ...prevSettings,
        localTaxAmount: numberValue,
      }));
    }
  };

  return (
    <>
      {priceSettings.localTax && (
        <div className="flex flex-col p-3 border-2 border-gray-200 rounded-sm mt-3 gap-2">
          <AdultTaxInput selectedCurrency={priceSettings.selectedCurrency} />
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
              <label className="text-gray-600 text-sm">
                Doba od której naliczany jest podatek lokalny
              </label>
              <div className="flex items-center border border-gray-200 rounded-sm focus-within:border-green-600 text-xs">
                <input
                  type="text"
                  className="flex-grow p-2 focus:outline-none"
                  defaultValue={priceSettings.localTaxAmount || 1}
                  onChange={handleTaxInputChange}
                />
              </div>
            </div>
            <ToggleSwitchComponent
              onToggle={handleAddCostToAdult}
              question="W cenie"
              checked={priceSettings.addCostToAdult}
            />
          </div>
          <AgeRangeInputs selectedCurrency={priceSettings.selectedCurrency} />
        </div>
      )}
    </>
  );
};

export default ConfigureLocalTaxAmount;
