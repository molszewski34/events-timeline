import React, { useState } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';

const ConfigureChildPrice = () => {
  const [minAgeListOpen, setMinAgeListOpen] = useState(false);
  const [maxAgeListOpen, setMaxAgeListOpen] = useState(false);
  const {
    selectedMinAge,
    setSelectedMinAge,
    selectedMaxAge,
    setSelectedMaxAge,
  } = usePriceConfigurationContext();

  console.log(selectedMinAge);

  const ageRange = Array.from({ length: 18 }, (_, index) => index);

  return (
    <div className="flex flex-col border border-gray-200 py-2 px-4 mt-2 w-full">
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm text-gray-600">Wiek od</label>
          <button
            className={`flex items-center gap-2 px-2 rounded-sm border justify-between ${
              minAgeListOpen ? 'border-green-600' : 'border-gray-200'
            }`}
            onClick={() => setMinAgeListOpen(!minAgeListOpen)}
          >
            <div className="flex gap-2 py-2 text-xs text-gray-600">
              {selectedMinAge !== null ? selectedMinAge : 'Wybierz wiek'}
            </div>
            <i className="text-xl">arrow_drop_down</i>
          </button>
          <div className="flex flex-col gap-2 text-xs mt-2 relative">
            <div
              className={`h-[300px] overflow-y-scroll absolute z-[99] w-full border py-1 ${
                minAgeListOpen ? '' : 'hidden overflow-hidden'
              }`}
            >
              {ageRange.map((age) => (
                <div key={age}>
                  <button
                    className={`flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm w-full text-sm ${
                      selectedMinAge === age ? 'bg-gray-200' : 'bg-white'
                    }`}
                    onClick={() => {
                      setSelectedMinAge(age);
                      setMinAgeListOpen(false);
                    }}
                  >
                    {age} lat
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm text-gray-600">Wiek do</label>
          <button
            className={`flex items-center gap-2 px-2 rounded-sm border justify-between ${
              maxAgeListOpen ? 'border-green-600' : 'border-gray-200'
            }`}
            onClick={() => setMaxAgeListOpen(!maxAgeListOpen)}
          >
            <div className="flex gap-2 py-2 text-xs text-gray-600">
              {selectedMaxAge !== null ? selectedMaxAge : 'Wybierz wiek'}
            </div>
            <i className="text-xl">arrow_drop_down</i>
          </button>
          <div className="flex flex-col gap-2 text-xs mt-2 relative">
            <div
              className={`h-[300px] overflow-y-scroll absolute z-[99] w-full border py-1 ${
                maxAgeListOpen ? '' : 'hidden overflow-hidden'
              }`}
            >
              {ageRange.map((age) => (
                <div key={age}>
                  <button
                    className={`flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm w-full text-sm ${
                      selectedMinAge === age ? 'bg-gray-200' : 'bg-white'
                    }`}
                    onClick={() => {
                      setSelectedMaxAge(age);
                      setMaxAgeListOpen(false);
                    }}
                  >
                    {age} lat
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button>Dodaj kolejny przedział wiekowy</button>
    </div>
  );
};

export default ConfigureChildPrice;
