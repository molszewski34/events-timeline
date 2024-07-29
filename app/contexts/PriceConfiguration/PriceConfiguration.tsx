'use client';

import React from 'react';
import { createContext, useContext, useState } from 'react';

const PriceConfiguration = createContext<any>(undefined);

export function PriceConfigurationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReminding, setIsReminding] = useState(true);
  return (
    <PriceConfiguration.Provider
      value={{
        isReminding,
        setIsReminding,
      }}
    >
      {children}
    </PriceConfiguration.Provider>
  );
}

export function usePriceConfigurationContext() {
  return useContext(PriceConfiguration);
}
