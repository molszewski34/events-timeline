'use client';

import React from 'react';
import { createContext, useContext, useState } from 'react';
import { initialPriceConfiguration } from './initialPriceConfiguration';

const PriceConfiguration = createContext<any>(undefined);

export function PriceConfigurationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [priceSettings, setPriceSettings] = useState(initialPriceConfiguration);

  return (
    <PriceConfiguration.Provider
      value={{
        priceSettings,
        setPriceSettings,
      }}
    >
      {children}
    </PriceConfiguration.Provider>
  );
}

export function usePriceConfigurationContext() {
  return useContext(PriceConfiguration);
}
