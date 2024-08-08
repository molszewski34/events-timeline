import React from 'react';

interface PriceInputProps {
  label: string;
  price: number;
  subLabel?: number;
}

const PriceInput: React.FC<PriceInputProps> = ({ label, price, subLabel }) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-col">
      <label className="text-xs text-gray-500 font-medium" htmlFor={label}>
        {label}
      </label>
      {subLabel !== undefined && (
        <span className="text-xs text-gray-500 font-medium">
          {`(do ${subLabel})`}
        </span>
      )}
      <input
        className="text-xs border border-gray-300 py-2 px-1 text-right max-w-36"
        readOnly
        type="text"
        defaultValue={price.toFixed(2)}
      />
    </div>
  </div>
);

export default PriceInput;
