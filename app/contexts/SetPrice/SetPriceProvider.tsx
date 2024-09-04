'use client';

import { createContext, useContext, useState } from 'react';
export const SetPrice = createContext<any>(undefined);

export function SetPriceWrapper({ children }: { children: React.ReactNode }) {
  const [openSetPricePanel, setOpenSetPricePanel] = useState(false);

  return (
    <SetPrice.Provider value={{ openSetPricePanel, setOpenSetPricePanel }}>
      {children}
    </SetPrice.Provider>
  );
}

export function SetPriceContext() {
  return useContext(SetPrice);
}
