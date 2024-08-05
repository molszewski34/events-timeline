import React, { useState } from 'react';
import AgeRangeItem from './AgeRangeItem';
import { useAgeRanges } from '@/app/hooks/ConfigureLocalTaxAmount/useAgeRanges';

interface AgeRangeInputsProps {
  selectedCurrency: string;
}

const AgeRangeInputs: React.FC<AgeRangeInputsProps> = ({
  selectedCurrency,
}) => {
  const {
    ageRanges,
    handleAddAgeRange,
    handleRemoveAgeRange,
    handleMinAgeChange,
    handleMaxAgeChange,
    handleLocalTaxForChildChange,
  } = useAgeRanges();

  const [minAgeListOpen, setMinAgeListOpen] = useState<number | null>(null);
  const [maxAgeListOpen, setMaxAgeListOpen] = useState<number | null>(null);

  const ageRange = Array.from({ length: 18 }, (_, index) => index);

  const getAvailableMinAge = (index: number): number => {
    if (index === 0) return 0;
    const prevMaxAge = ageRanges[index - 1].maxAge;
    return prevMaxAge !== null ? prevMaxAge + 1 : 0;
  };

  return (
    <div className="flex flex-col border border-gray-200 py-2 px-4 mt-2 w-full">
      {ageRanges.map((range, index) => (
        <AgeRangeItem
          key={index}
          index={index}
          range={range}
          selectedCurrency={selectedCurrency}
          ageRange={ageRange}
          minAgeListOpen={minAgeListOpen}
          setMinAgeListOpen={setMinAgeListOpen}
          maxAgeListOpen={maxAgeListOpen}
          setMaxAgeListOpen={setMaxAgeListOpen}
          handleMinAgeChange={handleMinAgeChange}
          handleMaxAgeChange={handleMaxAgeChange}
          handleLocalTaxForChildChange={handleLocalTaxForChildChange}
          handleRemoveAgeRange={handleRemoveAgeRange}
          getAvailableMinAge={getAvailableMinAge}
        />
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
  );
};

export default AgeRangeInputs;
