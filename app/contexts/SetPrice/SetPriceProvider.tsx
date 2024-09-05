'use client';

import { createContext, useContext, useState } from 'react';
export const SetPrice = createContext<any>(undefined);

export function SetPriceWrapper({ children }: { children: React.ReactNode }) {
  const [openSetPricePanel, setOpenSetPricePanel] = useState(true);

  return (
    <SetPrice.Provider value={{ openSetPricePanel, setOpenSetPricePanel }}>
      {children}
    </SetPrice.Provider>
  );
}

export function useSetPriceContext() {
  return useContext(SetPrice);
}
