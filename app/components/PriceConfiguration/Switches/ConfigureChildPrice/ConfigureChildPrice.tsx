import React from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import { PriceConfiguration } from '@/app/contexts/PriceConfiguration/types';
interface AgeRange {
  minAge: number | null;
  maxAge: number | null;
}

const ConfigureChildPrice: React.FC = () => {
  const { priceSettings, setPriceSettings } = usePriceConfigurationContext();

  const ageRange: number[] = Array.from({ length: 18 }, (_, index) => index);

  const handleAddAgeRange = () => {
    const lastMaxAge =
      priceSettings.ageRanges[priceSettings.ageRanges.length - 1]?.maxAge ?? -1;
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      ageRanges: [
        ...prevSettings.ageRanges,
        { minAge: lastMaxAge + 1, maxAge: null },
      ],
    }));
  };

  const handleRemoveAgeRange = (index: number) => {
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      ageRanges: prevSettings.ageRanges.filter(
        (_: unknown, i: number) => i !== index
      ),
    }));
  };

  const handleMinAgeChange = (index: number, age: number) => {
    const newAgeRanges = priceSettings.ageRanges.map(
      (range: AgeRange, i: number) =>
        i === index ? { ...range, minAge: age } : range
    );
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      ageRanges: newAgeRanges,
      minAgeListOpen: null,
    }));
  };

  const handleMaxAgeChange = (index: number, age: number) => {
    const newAgeRanges = priceSettings.ageRanges.map(
      (range: AgeRange, i: number) =>
        i === index ? { ...range, maxAge: age } : range
    );
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      ageRanges: newAgeRanges,
      maxAgeListOpen: null,
    }));
  };

  const getAvailableMinAge = (index: number): number => {
    if (index === 0) return 0;
    const prevMaxAge = priceSettings.ageRanges[index - 1]?.maxAge;
    return prevMaxAge !== null ? prevMaxAge + 1 : 0;
  };

  return (
    <>
      {priceSettings.childPrice && (
        <div className="flex flex-col border border-gray-200 py-2 px-4 mt-2 w-full">
          {priceSettings.ageRanges.map((range: AgeRange, index: number) => (
            <div
              key={index}
              className={`flex gap-2 w-full mb-2 ${index === 0 ? 'pr-8' : ''}`}
            >
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm text-gray-600">Wiek od</label>
                <button
                  className={`flex items-center gap-2 px-2 rounded-sm border justify-between ${
                    priceSettings.minAgeListOpen === index
                      ? 'border-green-600'
                      : 'border-gray-200'
                  }`}
                  onClick={() =>
                    setPriceSettings((prevSettings: PriceConfiguration) => ({
                      ...prevSettings,
                      minAgeListOpen:
                        prevSettings.minAgeListOpen === index ? null : index,
                    }))
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
                      priceSettings.minAgeListOpen === index
                        ? ''
                        : 'hidden overflow-hidden'
                    }`}
                  >
                    {ageRange
                      .filter((age) => age >= getAvailableMinAge(index))
                      .map((age: number) => (
                        <div key={age}>
                          <button
                            className={`flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm w-full text-sm ${
                              range.minAge === age ? 'bg-gray-200' : 'bg-white'
                            }`}
                            onClick={() => handleMinAgeChange(index, age)}
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
                    priceSettings.maxAgeListOpen === index
                      ? 'border-green-600'
                      : 'border-gray-200'
                  } ${range.minAge === null ? 'cursor-not-allowed' : ''}`}
                  onClick={() =>
                    range.minAge !== null &&
                    setPriceSettings((prevSettings: PriceConfiguration) => ({
                      ...prevSettings,
                      maxAgeListOpen:
                        prevSettings.maxAgeListOpen === index ? null : index,
                    }))
                  }
                  disabled={range.minAge === null}
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
                      priceSettings.maxAgeListOpen === index
                        ? ''
                        : 'hidden overflow-hidden'
                    }`}
                  >
                    {ageRange
                      .filter((age: number) => age > (range.minAge ?? -1))
                      .map((age: number) => (
                        <div key={age}>
                          <button
                            className={`flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm w-full text-sm ${
                              range.maxAge === age ? 'bg-gray-200' : 'bg-white'
                            }`}
                            onClick={() => handleMaxAgeChange(index, age)}
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
                  className="text-red-600 hover:text-red-800 material-icon text-xl"
                  onClick={() => handleRemoveAgeRange(index)}
                >
                  delete
                </button>
              )}
            </div>
          ))}
          <button
            className={`flex gap-2 text-sm justify-center items-center ${
              priceSettings.ageRanges.some(
                (range: AgeRange) =>
                  range.minAge === null || range.maxAge === null
              )
                ? 'text-gray-300'
                : 'text-green-500'
            }`}
            onClick={handleAddAgeRange}
            disabled={priceSettings.ageRanges.some(
              (range: AgeRange) =>
                range.minAge === null || range.maxAge === null
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
