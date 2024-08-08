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
  const [selectedMinAge, setSelectedMinAge] = useState(null);
  const [selectedMaxAge, setSelectedMaxAge] = useState(null);
  const [addCostToAdult, setAddCostToAdult] = useState(false);
  const [localTaxForChild, setLocalTaxForChild] = useState('');
  const [minAgeListOpen, setMinAgeListOpen] = useState<number | null>(null);
  const [maxAgeListOpen, setMaxAgeListOpen] = useState<number | null>(null);
  const [ageRanges, setAgeRanges] = useState<
    { minAge: number | null; maxAge: number | null }[]
  >([{ minAge: null, maxAge: null }]);
  const [shortStayMax, setShortStayMax] = useState<number>(0);
  const [shortStayMin, setShortStayMin] = useState<number>(0);
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
        selectedMinAge,
        setSelectedMinAge,
        selectedMaxAge,
        setSelectedMaxAge,
        addCostToAdult,
        setAddCostToAdult,
        localTaxForChild,
        setLocalTaxForChild,
        minAgeListOpen,
        setMinAgeListOpen,
        maxAgeListOpen,
        setMaxAgeListOpen,
        ageRanges,
        setAgeRanges,
        shortStayMax,
        setShortStayMax,
        shortStayMin,
        setShortStayMin,
      }}
    >
      {children}
    </PriceConfiguration.Provider>
  );
}

export function usePriceConfigurationContext() {
  return useContext(PriceConfiguration);
}
