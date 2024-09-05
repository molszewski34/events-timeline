import SectionHeader from '@/app/components/utils/SectionHeader';
import React from 'react';
import SetPriceDatePicker from '../SetPriceDatePicker/SetPriceDatePicker';

const SetPriceDatePickerSection = () => {
  return (
    <div className="flex flex-col gap-3">
      <header className="border-b-2 border-gray-200 pb-2 font-semibold text-gray-400 text-[13px]">
        <h1 className="text-gray-500">Wybierz Termin</h1>
      </header>
      <SetPriceDatePicker />
    </div>
  );
};

export default SetPriceDatePickerSection;
