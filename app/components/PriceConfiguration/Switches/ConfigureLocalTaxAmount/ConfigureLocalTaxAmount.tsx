import React, { useState } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import ToggleSwitchComponent from '../../ToggleSwitchButton/ToggleSwitchButton';

const ConfigureLocalTaxAmount = () => {
  const { selectedCurrency, addCostToAdult, setAddCostToAdult } =
    usePriceConfigurationContext();

  const handleAddCostToAdult = (value: boolean) => {
    setAddCostToAdult(value);
  };

  const [minAgeListOpen, setMinAgeListOpen] = useState(null);
  const [maxAgeListOpen, setMaxAgeListOpen] = useState(null);
  const [ageRanges, setAgeRanges] = useState([
    { localTaxForChild: null, minAge: null, maxAge: null },
  ]);

  console.log(ageRanges);

  const ageRange = Array.from({ length: 18 }, (_, index) => index);

  const handleAddAgeRange = () => {
    const lastMaxAge = ageRanges[ageRanges.length - 1].maxAge;
    setAgeRanges([
      ...ageRanges,
      { localTaxForChild: null, minAge: lastMaxAge + 1, maxAge: null },
    ]);
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

  const handleLocalTaxForChildChange = (index, value) => {
    const newAgeRanges = ageRanges.map((range, i) =>
      i === index ? { ...range, localTaxForChild: value } : range
    );
    setAgeRanges(newAgeRanges);
  };

  const getAvailableMinAge = (index) => {
    if (index === 0) return 0;
    const prevMaxAge = ageRanges[index - 1].maxAge;
    return prevMaxAge !== null ? prevMaxAge + 1 : 0;
  };

  return (
    <div className="flex flex-col p-3 border-2 border-gray-200 rounded-sm mt-3 gap-2">
      <div className="flex flex-col gap-2">
        <label className="text-gray-600 text-sm">
          Kwota podatku lokalnego za osoby dorosłe
        </label>
        <div className="flex items-center border border-gray-200 rounded-sm focus-within:border-green-600 text-xs">
          <input
            type="text"
            className="flex-grow p-2 focus:outline-none text-right"
          />
          <span className="p-2 text-gray-400">{selectedCurrency}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-sm">
            Doba od której naliczany jest podatek lokalny
          </label>
          <div className="flex items-center border border-gray-200 rounded-sm focus-within:border-green-600 text-xs">
            <input
              type="text"
              className="flex-grow p-2 focus:outline-none "
              defaultValue={1}
            />
          </div>
        </div>
        <ToggleSwitchComponent
          onToggle={handleAddCostToAdult}
          question="W cenie"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-600 text-sm">
          Kwota podatku lokalnego za dzieci
        </label>
        <div className="flex flex-col">
          <div className="flex flex-col border border-gray-200 py-2 px-4 mt-2 w-full">
            {ageRanges.map((range, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <div className="flex items-center border border-gray-200 rounded-sm focus-within:border-green-600 text-xs mr-7">
                  <input
                    type="text"
                    className="flex-grow p-2 focus:outline-none text-right"
                    value={range.localTaxForChild || ''}
                    onChange={(e) =>
                      handleLocalTaxForChildChange(index, e.target.value)
                    }
                  />
                  <span className="p-2 text-gray-400">{selectedCurrency}</span>
                </div>
                <div
                  className={`flex gap-2 w-full mb-2 ${
                    index === 0 ? 'pr-8' : ''
                  }`}
                >
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm text-gray-600">Wiek od</label>
                    <button
                      className={`flex items-center gap-2 px-2 rounded-sm border justify-between ${
                        minAgeListOpen === index
                          ? 'border-green-600'
                          : 'border-gray-200'
                      }`}
                      onClick={() =>
                        setMinAgeListOpen(
                          minAgeListOpen === index ? null : index
                        )
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
                          minAgeListOpen === index
                            ? ''
                            : 'hidden overflow-hidden'
                        }`}
                      >
                        {ageRange
                          .filter((age) => age >= getAvailableMinAge(index))
                          .map((age) => (
                            <div key={age}>
                              <button
                                className={`flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm w-full text-sm ${
                                  range.minAge === age
                                    ? 'bg-gray-200'
                                    : 'bg-white'
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
                      } ${range.minAge === null ? 'cursor-not-allowed' : ''}`}
                      onClick={() =>
                        range.minAge !== null &&
                        setMaxAgeListOpen(
                          maxAgeListOpen === index ? null : index
                        )
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
                          maxAgeListOpen === index
                            ? ''
                            : 'hidden overflow-hidden'
                        }`}
                      >
                        {ageRange
                          .filter((age) => age > range.minAge)
                          .map((age) => (
                            <div key={age}>
                              <button
                                className={`flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm w-full text-sm ${
                                  range.maxAge === age
                                    ? 'bg-gray-200'
                                    : 'bg-white'
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
                      className="text-red-600 hover:text-red-800 material-icon text-xl"
                      onClick={() => handleRemoveAgeRange(index)}
                    >
                      delete
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              className={`flex gap-2 text-sm justify-center items-center ${
                ageRanges.some(
                  (range) =>
                    range.localTaxForChild === null ||
                    range.minAge === null ||
                    range.maxAge === null
                )
                  ? 'text-gray-300'
                  : 'text-green-500'
              }`}
              onClick={handleAddAgeRange}
              disabled={ageRanges.some(
                (range) =>
                  range.localTaxForChild === null ||
                  range.minAge === null ||
                  range.maxAge === null
              )}
            >
              <i className="text-lg">add</i> Dodaj kolejny przedział wiekowy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigureLocalTaxAmount;
