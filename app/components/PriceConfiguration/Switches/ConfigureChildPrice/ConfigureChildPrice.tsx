import React, { useState } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';

const ConfigureChildPrice = () => {
  const [minAgeListOpen, setMinAgeListOpen] = useState(null);
  const [maxAgeListOpen, setMaxAgeListOpen] = useState(null);
  const [ageRanges, setAgeRanges] = useState([{ minAge: null, maxAge: null }]);

  const { childPrice } = usePriceConfigurationContext();

  console.log(ageRanges);

  const ageRange = Array.from({ length: 18 }, (_, index) => index);

  const handleAddAgeRange = () => {
    setAgeRanges([...ageRanges, { minAge: null, maxAge: null }]);
  };

  const handleRemoveAgeRange = (index) => {
    const newAgeRanges = ageRanges.filter((_, i) => i !== index);
    setAgeRanges(newAgeRanges);
  };

  const handleMinAgeChange = (index, age) => {
    const newAgeRanges = ageRanges.map((range, i) =>
      i === index ? { ...range, minAge: age } : range
    );
    setAgeRanges(newAgeRanges);
  };

  const handleMaxAgeChange = (index, age) => {
    const newAgeRanges = ageRanges.map((range, i) =>
      i === index ? { ...range, maxAge: age } : range
    );
    setAgeRanges(newAgeRanges);
  };

  return (
    <>
      {childPrice && (
        <div className="flex flex-col border border-gray-200 py-2 px-4 mt-2 w-full">
          {ageRanges.map((range, index) => (
            <div key={index} className="flex gap-2 w-full mb-2">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm text-gray-600">Wiek od</label>
                <button
                  className={`flex items-center gap-2 px-2 rounded-sm border justify-between ${
                    minAgeListOpen === index
                      ? 'border-green-600'
                      : 'border-gray-200'
                  }`}
                  onClick={() =>
                    setMinAgeListOpen(minAgeListOpen === index ? null : index)
                  }
                >
                  <div className="flex gap-2 py-2 text-xs text-gray-600">
                    {range.minAge !== null
                      ? `${range.minAge} lat`
                      : 'Wybierz wiek'}
                  </div>
                  <i className="text-xl">arrow_drop_down</i>
                </button>
                <div className="flex flex-col gap-2 text-xs mt-2 relative">
                  <div
                    className={`h-[300px] overflow-y-scroll absolute z-[99] w-full border py-1 ${
                      minAgeListOpen === index ? '' : 'hidden overflow-hidden'
                    }`}
                  >
                    {ageRange.map((age) => (
                      <div key={age}>
                        <button
                          className={`flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm w-full text-sm ${
                            range.minAge === age ? 'bg-gray-200' : 'bg-white'
                          }`}
                          onClick={() => {
                            handleMinAgeChange(index, age);
                            setMinAgeListOpen(null);
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
                    maxAgeListOpen === index
                      ? 'border-green-600'
                      : 'border-gray-200'
                  }`}
                  onClick={() =>
                    setMaxAgeListOpen(maxAgeListOpen === index ? null : index)
                  }
                >
                  <div className="flex gap-2 py-2 text-xs text-gray-600">
                    {range.maxAge !== null
                      ? `${range.maxAge} lat`
                      : 'Wybierz wiek'}
                  </div>
                  <i className="text-xl">arrow_drop_down</i>
                </button>
                <div className="flex flex-col gap-2 text-xs mt-2 relative">
                  <div
                    className={`h-[300px] overflow-y-scroll absolute z-[99] w-full border py-1 ${
                      maxAgeListOpen === index ? '' : 'hidden overflow-hidden'
                    }`}
                  >
                    {ageRange.map((age) => (
                      <div key={age}>
                        <button
                          className={`flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm w-full text-sm ${
                            range.maxAge === age ? 'bg-gray-200' : 'bg-white'
                          }`}
                          onClick={() => {
                            handleMaxAgeChange(index, age);
                            setMaxAgeListOpen(null);
                          }}
                        >
                          {age} lat
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {index > 0 && (
                <button
                  className="text-red-600 hover:text-red-800 material-icon text-2xl"
                  onClick={() => handleRemoveAgeRange(index)}
                >
                  delete
                </button>
              )}
            </div>
          ))}
          <button
            className="flex gap-2 text-sm justify-center items-center"
            onClick={handleAddAgeRange}
            disabled={ageRanges.some(
              (range) => range.minAge === null || range.maxAge === null
            )}
          >
            <i className="text-lg">add</i> Dodaj kolejny przedział wiekowy
          </button>
        </div>
      )}
    </>
  );
};

export default ConfigureChildPrice;
