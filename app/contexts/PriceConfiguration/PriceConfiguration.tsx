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
  const [partialOccupancyPrice, setPartialOccupancyPrice] = useState(false);
  const [weekendPrice, setWeekendPrice] = useState(false);
  const [stayDuration, setStayDuration] = useState(false);
  const [childPrice, setChildPrice] = useState(false);
  const [mealPrice, setMealPrice] = useState(false);
  const [localTaxAmount, setLocalTaxAmount] = useState(false);
  const [bookingRestrictions, setBookingRestrictions] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  return (
    <PriceConfiguration.Provider
      value={{
        isReminding,
        setIsReminding,
        partialOccupancyPrice,
        setPartialOccupancyPrice,
        weekendPrice,
        setWeekendPrice,
        stayDuration,
        setStayDuration,
        childPrice,
        setChildPrice,
        mealPrice,
        setMealPrice,
        localTaxAmount,
        setLocalTaxAmount,
        bookingRestrictions,
        setBookingRestrictions,
        selectedCurrency,
        setSelectedCurrency,
      }}
    >
      {children}
    </PriceConfiguration.Provider>
  );
}

export function usePriceConfigurationContext() {
  return useContext(PriceConfiguration);
}
