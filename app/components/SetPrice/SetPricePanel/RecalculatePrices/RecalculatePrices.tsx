import React, { useState, useEffect } from 'react';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

interface Price {
  [key: string]: number;
}

interface PriceFormData {
  partialPrices?: Price[];
  partialPricesForChildrens?: Price[];
}

const RecalculatePrices: React.FC = () => {
  const { priceFormData, setPriceFormData } = useSetPriceContext();
  const [value, setValue] = useState<number>(0);
  const [calculationType, setCalculationType] = useState<'amount' | 'percent'>(
    'amount'
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const areAllPricesZero = (prices: Price[]): boolean => {
    return prices.every((price) =>
      Object.values(price).every((amount) => amount === 0)
    );
  };

  useEffect(() => {
    const { partialPrices, partialPricesForChildrens } = priceFormData;

    const allPartialPricesZero =
      partialPrices && partialPrices.length > 0
        ? areAllPricesZero(partialPrices)
        : true;

    const allPartialPricesForChildrenZero =
      partialPricesForChildrens && partialPricesForChildrens.length > 0
        ? areAllPricesZero(partialPricesForChildrens)
        : true;

    setIsDisabled(allPartialPricesZero && allPartialPricesForChildrenZero);
  }, [priceFormData]);

  const updatePrices = (prices: Price[]): Price[] => {
    return prices.map((price) => {
      const updatedPrice: Price = {};
      for (const [key, amount] of Object.entries(price)) {
        updatedPrice[key] =
          calculationType === 'amount'
            ? amount + value
            : amount + (amount * value) / 100;
      }
      return updatedPrice;
    });
  };

  const handleRecalculate = (): void => {
    const { partialPrices, partialPricesForChildrens } = priceFormData;

    if (!partialPrices && !partialPricesForChildrens) {
      console.error('Prices are not defined');
      return;
    }

    const updatedPartialPrices = updatePrices(partialPrices || []);

    const updatedPartialPricesForChildrens = updatePrices(
      partialPricesForChildrens || []
    );

    setPriceFormData((prevData: PriceFormData) => ({
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
          type="text"
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
        className={` text-xs  font-bold h-8 ${
          isDisabled ? 'bg-[#e1e1e1] text-gray-300' : 'bg-green-600 text-white'
        }`}
        onClick={handleRecalculate}
        disabled={isDisabled}
      >
        Przelicz
      </button>
    </div>
  );
};

export default RecalculatePrices;
