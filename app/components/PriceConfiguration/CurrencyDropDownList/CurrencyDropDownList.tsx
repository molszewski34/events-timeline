import React, { useState } from 'react';
import { currency_codes } from './data';

const CurrencyDropdownList = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [countriesListOpen, setCountriesListOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-col">
        <label className="text-sm">Ustaw walutę cennika:</label>
        <button
          className={`flex items-center gap-2  px-2 rounded-sm border  justify-between ${
            countriesListOpen ? 'border-green-600' : 'border-gray-200'
          } `}
          onClick={() => setCountriesListOpen(!countriesListOpen)}
        >
          <div className="flex gap-2 py-2 text-xs">
            {selectedCurrency || 'EUR'}
          </div>
          <i className="text-xl">arrow_drop_down</i>
        </button>
        <div className="flex flex-col gap-2 text-xs mt-2 relative ">
          <div
            className={`h-[300px] overflow-y-scroll absolute w-full border py-1 ${
              countriesListOpen ? '' : 'hidden overflow-hidden'
            }`}
          >
            {currency_codes.map((currency, index) => (
              <div key={index}>
                <button
                  className={`flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm w-full text-sm ${
                    selectedCurrency === currency ? 'bg-gray-200' : 'bg-white'
                  }`}
                  onClick={() => {
                    setSelectedCurrency(currency);
                    setCountriesListOpen(false);
                  }}
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
