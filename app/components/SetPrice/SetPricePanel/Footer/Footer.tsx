import React from 'react';

import SubmitButton from '@/app/components/utils/SubmitButton';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import SetPriceSubmitBtn from '../SetPriceSubmitBtn/SetPriceSubmitBtn';
const Footer: React.FC = () => {
  const { openSetPricePanel, setOpenSetPricePanel } = useSetPriceContext();
  const { setOverlay } = useCalendarContext();
  return (
    <div className="flex items-center justify-around">
      <button
        onClick={() => {
          setOpenSetPricePanel(!openSetPricePanel);
          setOverlay(false);
        }}
        className="flex gap-1 bg-gray-300 text-sm font-semibold  w-full items-center justify-center  rounded-sm h-8"
      >
        Zamknij
      </button>
      <SetPriceSubmitBtn />
    </div>
  );
};

export default Footer;
