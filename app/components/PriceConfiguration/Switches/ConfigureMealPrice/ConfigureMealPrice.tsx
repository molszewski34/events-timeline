import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import React, { useState } from 'react';

const ConfigureMealPrice = () => {
  const { selectedCurrency, mealPrice } = usePriceConfigurationContext();

  const [prices, setPrices] = useState({
    bb: '',
    hb: '',
    fb: '',
  });

  const [included, setIncluded] = useState({
    bb: false,
    hb: false,
    fb: false,
  });

  const [focusedField, setFocusedField] = useState(null);

  const handlePriceChange = (e, mealType) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 6) {
      setPrices({
        ...prices,
        [mealType]: parseFloat(value).toFixed(2),
      });
    }
  };

  const handleCheckboxChange = (e, mealType) => {
    setIncluded({
      ...included,
      [mealType]: e.target.checked,
    });
  };

  const handleFocus = (mealType) => {
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
            { label: 'HB - śniadanie,obiadkolacja', mealType: 'hb' },
            { label: 'FB - śniadanie, obiad, kolacja', mealType: 'fb' },
          ].map(({ label, mealType }) => (
            <div key={mealType} className="flex flex-col ">
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
