import React from 'react';

interface AdultTaxInputProps {
  selectedCurrency: string;
}

const AdultTaxInput: React.FC<AdultTaxInputProps> = ({ selectedCurrency }) => {
  return (
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
  );
};

export default AdultTaxInput;
