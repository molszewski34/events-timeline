import React from 'react';

interface AgeRange {
  localTaxForChild: string | null;
  minAge: number | null;
  maxAge: number | null;
}

interface AgeRangeItemProps {
  index: number;
  range: AgeRange;
  selectedCurrency: string;
  ageRange: number[];
  minAgeListOpen: number | null;
  setMinAgeListOpen: (index: number | null) => void;
  maxAgeListOpen: number | null;
  setMaxAgeListOpen: (index: number | null) => void;
  handleMinAgeChange: (index: number, age: number) => void;
  handleMaxAgeChange: (index: number, age: number) => void;
  handleLocalTaxForChildChange: (index: number, value: string) => void;
  handleRemoveAgeRange: (index: number) => void;
  getAvailableMinAge: (index: number) => number;
}

const AgeRangeItem: React.FC<AgeRangeItemProps> = ({
  index,
  range,
  selectedCurrency,
  ageRange,
  minAgeListOpen,
  setMinAgeListOpen,
  maxAgeListOpen,
  setMaxAgeListOpen,
  handleMinAgeChange,
  handleMaxAgeChange,
  handleLocalTaxForChildChange,
  handleRemoveAgeRange,
  getAvailableMinAge,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center border border-gray-200 rounded-sm focus-within:border-green-600 text-xs mr-7">
        <input
          type="text"
          className="flex-grow p-2 focus:outline-none text-right"
          value={range.localTaxForChild || ''}
          onChange={(e) => handleLocalTaxForChildChange(index, e.target.value)}
        />
        <span className="p-2 text-gray-400">{selectedCurrency}</span>
      </div>
      <div className={`flex gap-2 w-full mb-2 ${index === 0 ? 'pr-8' : ''}`}>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm text-gray-600">Wiek od</label>
          <button
            className={`flex items-center gap-2 px-2 rounded-sm border justify-between ${
              minAgeListOpen === index ? 'border-green-600' : 'border-gray-200'
            }`}
            onClick={() =>
              setMinAgeListOpen(minAgeListOpen === index ? null : index)
            }
          >
            <div className="flex gap-2 py-2 text-xs text-gray-600">
              {range.minAge !== null ? `${range.minAge} lat` : 'Wybierz wiek'}
            </div>
            <i className="text-xl">arrow_drop_down</i>
          </button>
          <div className="flex flex-col gap-2 text-xs mt-2 relative">
            <div
              className={`h-[300px] overflow-y-scroll absolute z-[99] w-full border py-1 ${
                minAgeListOpen === index ? '' : 'hidden overflow-hidden'
              }`}
            >
              {ageRange
                .filter((age) => age >= getAvailableMinAge(index))
                .map((age) => (
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
              maxAgeListOpen === index ? 'border-green-600' : 'border-gray-200'
            } ${range.minAge === null ? 'cursor-not-allowed' : ''}`}
            onClick={() =>
              range.minAge !== null &&
              setMaxAgeListOpen(maxAgeListOpen === index ? null : index)
            }
            disabled={range.minAge === null}
          >
            <div className="flex gap-2 py-2 text-xs text-gray-600">
              {range.maxAge !== null ? `${range.maxAge} lat` : 'Wybierz wiek'}
            </div>
            <i className="text-xl">arrow_drop_down</i>
          </button>
          <div className="flex flex-col gap-2 text-xs mt-2 relative">
            <div
              className={`h-[300px] overflow-y-scroll absolute z-[99] w-full border py-1 ${
                maxAgeListOpen === index ? '' : 'hidden overflow-hidden'
              }`}
            >
              {ageRange
                .filter((age) => age > (range.minAge ?? 0))
                .map((age) => (
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
            className="text-red-600 hover:text-red-800 material-icon text-xl"
            onClick={() => handleRemoveAgeRange(index)}
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AgeRangeItem;
