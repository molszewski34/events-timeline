import React from 'react';

interface PriceInputProps {
  label: string;
  price: number;
}

const PriceInput: React.FC<PriceInputProps> = ({ label, price }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs text-gray-500 font-medium" htmlFor={label}>
      {label}
    </label>
    <input
      className="text-xs border border-gray-300 py-2 px-1 text-right max-w-36"
      readOnly
      type="text"
      defaultValue={price.toFixed(2)}
    />
  </div>
);

export default PriceInput;
