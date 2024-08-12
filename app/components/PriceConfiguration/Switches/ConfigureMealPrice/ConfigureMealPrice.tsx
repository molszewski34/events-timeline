import React, { ChangeEvent } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import {
  PriceConfiguration,
  MealPrices,
  MealIncluded,
  MealType,
} from '@/app/contexts/PriceConfiguration/types';

const ConfigureMealPrice: React.FC = () => {
  const { priceSettings, setPriceSettings } = usePriceConfigurationContext();

  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    mealType: MealType
  ) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && value.length <= 6) {
      setPriceSettings((prevSettings: PriceConfiguration) => ({
        ...prevSettings,
        mealPrices: {
          ...prevSettings.mealPrices,
          [mealType]: parseFloat(value).toFixed(2),
        },
      }));
    }
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    mealType: MealType
  ) => {
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      mealIncluded: {
        ...prevSettings.mealIncluded,
        [mealType]: e.target.checked,
      },
    }));
  };

  const handleFocus = (mealType: MealType) => {
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      focusedField: mealType,
    }));
  };

  const handleBlur = () => {
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      focusedField: null,
    }));
  };

  return (
    <>
      {priceSettings.mealPrices && (
        <div className="flex flex-col p-3 border-2 border-gray-200 rounded-sm mt-3 gap-2">
          {[
            { label: 'BB - śniadanie', mealType: 'bb' },
            { label: 'HB - śniadanie, obiadkolacja', mealType: 'hb' },
            { label: 'FB - śniadanie, obiad, kolacja', mealType: 'fb' },
          ].map(({ label, mealType }) => (
            <div key={mealType} className="flex flex-col">
              <label className="mb-2 text-sm text-gray-600">{label}</label>
              <div className="flex flex-col">
                <div
                  className={`flex items-center border px-1 rounded-sm ${
                    priceSettings.focusedField === mealType
                      ? 'border-green-600'
                      : 'border-gray-200'
                  }`}
                >
                  <input
                    type="text"
                    value={priceSettings.mealPrices[mealType]}
                    onChange={(e) => handlePriceChange(e, mealType)}
                    onFocus={() => handleFocus(mealType)}
                    onBlur={handleBlur}
                    className="p-2 text-xs text-right w-full"
                    placeholder="0.00"
                  />
                  <span className="text-sm text-gray-400">
                    {priceSettings.selectedCurrency}
                  </span>
                </div>
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={priceSettings.mealIncluded[mealType]}
                    onChange={(e) => handleCheckboxChange(e, mealType)}
                    className="mr-2 accent-green-600 bg-gray-200"
                  />
                  W cenie
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ConfigureMealPrice;
