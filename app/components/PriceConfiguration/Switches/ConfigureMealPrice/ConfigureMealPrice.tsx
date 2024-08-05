import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import React, { useState, ChangeEvent, FocusEvent } from 'react';

interface PricesState {
  bb: string;
  hb: string;
  fb: string;
}

interface IncludedState {
  bb: boolean;
  hb: boolean;
  fb: boolean;
}

const ConfigureMealPrice: React.FC = () => {
  const { selectedCurrency, mealPrice } = usePriceConfigurationContext();

  const [prices, setPrices] = useState<PricesState>({
    bb: '',
    hb: '',
    fb: '',
  });

  const [included, setIncluded] = useState<IncludedState>({
    bb: false,
    hb: false,
    fb: false,
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    mealType: keyof PricesState
  ) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && value.length <= 6) {
      setPrices((prevPrices) => ({
        ...prevPrices,
        [mealType]: parseFloat(value).toFixed(2),
      }));
    }
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    mealType: keyof IncludedState
  ) => {
    setIncluded((prevIncluded) => ({
      ...prevIncluded,
      [mealType]: e.target.checked,
    }));
  };

  const handleFocus = (mealType: keyof PricesState) => {
    setFocusedField(mealType);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <>
      {mealPrice && (
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
                    focusedField === mealType
                      ? 'border-green-600'
                      : 'border-gray-200'
                  }`}
                >
                  <input
                    type="text"
                    value={prices[mealType]}
                    onChange={(e) => handlePriceChange(e, mealType)}
                    onFocus={() => handleFocus(mealType)}
                    onBlur={handleBlur}
                    className="p-2 text-xs text-right w-full"
                    placeholder="0.00"
                  />
                  <span className="text-sm text-gray-400">
                    {selectedCurrency}
                  </span>
                </div>
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={included[mealType]}
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
