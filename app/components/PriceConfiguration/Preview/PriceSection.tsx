import React from 'react';
import PriceInput from './PriceInput';

interface Price {
  label: string;
  subLabel?: number | string;
  price: number;
  field?: string; // Dodano pole do identyfikacji
}

interface PriceSectionProps {
  title: string;
  prices: Price[];
  readOnly: boolean;
  onInputChange: (field: string, value: string) => void;
}

const PriceSection: React.FC<PriceSectionProps> = ({
  title,
  prices,
  readOnly = true,
  onInputChange,
}) => (
  <div className="flex flex-col border-b border-gray-300 pb-4">
    <header className="text-sm text-gray-500">{title}</header>
    <div className="flex justify-between flex-wrap mt-2 gap-2">
      {prices.map(({ label, price, subLabel, field }) => (
        <PriceInput
          key={label}
          label={label}
          price={price}
          subLabel={subLabel}
          readOnly={readOnly}
          onChange={(value) => onInputChange(field, value)} // Przekazuje onChange
        />
      ))}
    </div>
  </div>
);

export default PriceSection;
