'use client';

import { createContext, useContext, useState } from 'react';
import { initialSetPriceData } from './initialSetPriceData';
export const SetPrice = createContext<any>(undefined);

export function SetPriceWrapper({ children }: { children: React.ReactNode }) {
  const [openSetPricePanel, setOpenSetPricePanel] = useState(false);
  const [priceFormData, setPriceFormData] = useState(initialSetPriceData);

  return (
    <SetPrice.Provider
      value={{
        openSetPricePanel,
        setOpenSetPricePanel,
        priceFormData,
        setPriceFormData,
      }}
    >
      {children}
    </SetPrice.Provider>
  );
}

export function useSetPriceContext() {
  return useContext(SetPrice);
}
