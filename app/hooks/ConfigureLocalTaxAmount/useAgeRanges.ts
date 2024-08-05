import { useState } from 'react';

interface AgeRange {
  localTaxForChild: string | null;
  minAge: number | null;
  maxAge: number | null;
}

export const useAgeRanges = () => {
  const [ageRanges, setAgeRanges] = useState<AgeRange[]>([
    { localTaxForChild: null, minAge: null, maxAge: null },
  ]);

  const handleAddAgeRange = () => {
    const lastMaxAge = ageRanges[ageRanges.length - 1].maxAge;
    setAgeRanges([
      ...ageRanges,
      { localTaxForChild: null, minAge: (lastMaxAge ?? 0) + 1, maxAge: null },
    ]);
  };

  const handleRemoveAgeRange = (index: number) => {
    const newAgeRanges = ageRanges.filter((_, i) => i !== index);
    setAgeRanges(newAgeRanges);
  };

  const handleMinAgeChange = (index: number, age: number) => {
    const newAgeRanges = ageRanges.map((range, i) =>
      i === index ? { ...range, minAge: age } : range
    );
    setAgeRanges(newAgeRanges);
  };

  const handleMaxAgeChange = (index: number, age: number) => {
    const newAgeRanges = ageRanges.map((range, i) =>
      i === index ? { ...range, maxAge: age } : range
    );
    setAgeRanges(newAgeRanges);
  };

  const handleLocalTaxForChildChange = (index: number, value: string) => {
    const newAgeRanges = ageRanges.map((range, i) =>
      i === index ? { ...range, localTaxForChild: value } : range
    );
    setAgeRanges(newAgeRanges);
  };

  return {
    ageRanges,
    handleAddAgeRange,
    handleRemoveAgeRange,
    handleMinAgeChange,
    handleMaxAgeChange,
    handleLocalTaxForChildChange,
  };
};
