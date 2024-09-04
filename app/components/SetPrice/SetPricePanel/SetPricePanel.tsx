'use client';

import React from 'react';
import SetPriceHeader from './SetPriceHeader/SetPriceHeader';
import { SetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';

const SetPricePanel = () => {
  const { openSetPricePanel, setOpenSetPricePanel } = SetPriceContext();

  return (
    <main
      style={{ display: openSetPricePanel ? 'flex' : 'none' }}
      className="fixed w-[92vw] max-w-[80em]  justify-self-center top-[12.5vh] right-[4vw] left-[4vw]  bg-white z-[999] p-[1.27em] flex flex-col gap-4"
    >
      <div className="relative flex flex-col gap-2">
        <SetPriceHeader />
      </div>
    </main>
  );
};

export default SetPricePanel;
