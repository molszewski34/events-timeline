import React, { useState } from 'react';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

const RecalculatePrices = () => {
  const { priceFormData, setPriceFormData } = useSetPriceContext();
  const [value, setValue] = useState(0);
  const [calculationType, setCalculationType] = useState('amount');

  const updatePrices = (prices) => {
    return prices.map((price) => {
      const updatedPrice = {};
      for (const [key, amount] of Object.entries(price)) {
        updatedPrice[key] =
          calculationType === 'amount'
            ? amount + value
            : amount + (amount * value) / 100;
      }
      return updatedPrice;
    });
  };

  const handleRecalculate = () => {
    const { partialPrices, partialPricesForChildrens } = priceFormData;

    if (!partialPrices && !partialPricesForChildrens) {
      console.error('Prices are not defined');
      return;
    }

    const updatedPartialPrices = updatePrices(partialPrices || []);

    const updatedPartialPricesForChildrens = updatePrices(
      partialPricesForChildrens || []
    );

    setPriceFormData((prevData) => ({
      ...prevData,
      partialPrices: updatedPartialPrices,
      partialPricesForChildrens: updatedPartialPricesForChildrens,
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-gray-500 text-xs pb-1 border-b border-gray-300 font-bold">
        Przelicz ceny
      </h1>
      <div className="flex justify-between gap-2">
        <input
          className="text-xs border border-gray-300 py-2 px-1 flex-1 text-left rounded-sm"
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
        />
        <select
          className="flex-1 border border-gray-300 text-xs bg-white pl-2"
          value={calculationType}
          onChange={(e) => setCalculationType(e.target.value)}
        >
          <option value="amount">Kwota</option>
          <option value="percent">Procent</option>
        </select>
      </div>
      <button
        className="bg-gray-200 text-xs text-gray-600 font-bold h-8"
        onClick={handleRecalculate}
      >
        Przelicz
      </button>
    </div>
  );
};

export default RecalculatePrices;
