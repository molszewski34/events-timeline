import React from 'react';
import { currency_codes } from './data';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import { PriceConfiguration } from '@/app/contexts/PriceConfiguration/types';

const CurrencyDropdownList: React.FC = () => {
  const { selectedCurrency, setPriceSettings, priceSettings } =
    usePriceConfigurationContext();
  const [countriesListOpen, setCountriesListOpen] = React.useState(false);

  const handleCurrencyChange = (currency: string) => {
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      selectedCurrency: currency,
    }));
    setCountriesListOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Ustaw walutę cennika:</label>
        <button
          className={`flex items-center gap-2 px-2 rounded-sm border justify-between ${
            countriesListOpen ? 'border-green-600' : 'border-gray-200'
          }`}
          onClick={() => setCountriesListOpen(!countriesListOpen)}
        >
          <div className="flex gap-2 py-2 text-xs">
            {priceSettings.selectedCurrency || 'EUR'}
          </div>
          <i className="text-xl">arrow_drop_down</i>
        </button>
        <div className="flex flex-col gap-2 text-xs mt-2 relative">
          <div
            className={`h-[300px] overflow-y-scroll absolute z-50 w-full border py-1 ${
              countriesListOpen ? '' : 'hidden overflow-hidden'
            }`}
          >
            {currency_codes.map((currency, index) => (
              <div key={index}>
                <button
                  className={`flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm w-full text-sm ${
                    selectedCurrency === currency ? 'bg-gray-200' : 'bg-white'
                  }`}
                  onClick={() => handleCurrencyChange(currency)}
                >
                  {currency}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDropdownList;
