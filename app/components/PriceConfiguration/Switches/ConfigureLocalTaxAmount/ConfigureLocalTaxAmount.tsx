import React from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import ToggleSwitchComponent from '../../ToggleSwitchButton/ToggleSwitchButton';
import AdultTaxInput from './AdultTaxInput';
import AgeRangeInputs from './AgeRangeInputs';

const ConfigureLocalTaxAmount: React.FC = () => {
  const { selectedCurrency, setAddCostToAdult, localTaxAmount } =
    usePriceConfigurationContext();

  const handleAddCostToAdult = (value: boolean) => {
    setAddCostToAdult(value);
  };

  return (
    <>
      {localTaxAmount && (
        <div className="flex flex-col p-3 border-2 border-gray-200 rounded-sm mt-3 gap-2">
          <AdultTaxInput selectedCurrency={selectedCurrency} />
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
              <label className="text-gray-600 text-sm">
                Doba od której naliczany jest podatek lokalny
              </label>
              <div className="flex items-center border border-gray-200 rounded-sm focus-within:border-green-600 text-xs">
                <input
                  type="text"
                  className="flex-grow p-2 focus:outline-none"
                  defaultValue={1}
                />
              </div>
            </div>
            <ToggleSwitchComponent
              onToggle={handleAddCostToAdult}
              question="W cenie"
            />
          </div>
          <AgeRangeInputs selectedCurrency={selectedCurrency} />
        </div>
      )}
    </>
  );
};

export default ConfigureLocalTaxAmount;
