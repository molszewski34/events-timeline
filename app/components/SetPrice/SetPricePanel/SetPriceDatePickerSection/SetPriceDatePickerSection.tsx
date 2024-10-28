import React from 'react';

import Header from './ui/Header';
import RenderPrices from './RenderPrices';
import Button from './ui/Button';
const SetPriceDatePickerSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <Header />
      <RenderPrices />
      <Button />
    </div>
  );
};

export default SetPriceDatePickerSection;
