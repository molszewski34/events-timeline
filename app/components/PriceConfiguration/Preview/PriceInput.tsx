import React from 'react';

interface PriceInputProps {
  label: string;
  price: number;
  subLabel?: number | string;
  readOnly?: boolean;
  onChange: (value: string) => void; // Dodano prop onChange
}

const PriceInput: React.FC<PriceInputProps> = ({
  label,
  price,
  subLabel,
  readOnly = true,
  onChange,
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-col">
      <label className="text-xs text-gray-500 font-medium" htmlFor={label}>
        {label}
      </label>
      {subLabel !== undefined && (
        <span className="text-xs text-gray-500 font-medium">{subLabel}</span>
      )}
      <input
        className="text-xs border border-gray-300 py-2 px-1 text-right max-w-36"
        readOnly={readOnly}
        type="text"
        value={price.toFixed(2)}
        onChange={(e) => onChange(e.target.value)} // Obsługuje zmianę
      />
    </div>
  </div>
);

export default PriceInput;
