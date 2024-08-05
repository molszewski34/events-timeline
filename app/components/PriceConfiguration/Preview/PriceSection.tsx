import React from 'react';
import PriceInput from './PriceInput';

interface Price {
  label: string;
  price: number;
}

interface PriceSectionProps {
  title: string;
  prices: Price[];
}

const PriceSection: React.FC<PriceSectionProps> = ({ title, prices }) => (
  <div className="flex flex-col border-b border-gray-300 pb-4">
    <header className="text-sm text-gray-500">{title}</header>
    <div className="flex justify-between mt-2 gap-2">
      {prices.map(({ label, price }) => (
        <PriceInput key={label} label={label} price={price} />
      ))}
    </div>
  </div>
);

export default PriceSection;
