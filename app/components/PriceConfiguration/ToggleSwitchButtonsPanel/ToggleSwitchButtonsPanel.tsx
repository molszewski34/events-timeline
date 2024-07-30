import React, { useState } from 'react';
import ToggleSwitchComponent from '../ToggleSwitchButton/ToggleSwitchButton';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';

const ToggleSwitchButtonsPanel = () => {
  const {
    setPartialOccupancyPrice,
    setWeekendPrice,
    setStayDuration,
    setChildPrice,
    setMealPrice,
    setLocalTaxAmount,
    setBookingRestrictions,
  } = usePriceConfigurationContext();

  const handleConfigurePartialOccupancyPrice = (value: boolean) => {
    setPartialOccupancyPrice(value);
  };

  const handleConfigureWeekendPrice = (value: boolean) => {
    setWeekendPrice(value);
  };

  const handleChooseStayDuration = (value: boolean) => {
    setStayDuration(value);
  };

  const handleConfigureChildPrice = (value: boolean) => {
    setChildPrice(value);
  };

  const handleConfigureMealPrice = (value: boolean) => {
    setMealPrice(value);
  };

  const handleConfigureLocalTaxAmount = (value: boolean) => {
    setLocalTaxAmount(value);
  };

  const handleConfigureBookingRestrictions = (value: boolean) => {
    setBookingRestrictions(value);
  };

  return (
    <div className="">
      <ToggleSwitchComponent
        onToggle={handleConfigurePartialOccupancyPrice}
        question="Wybierz czy chcesz skonfigurować cenę dla niepełnego obłożenia"
      />
      <ToggleSwitchComponent
        onToggle={handleConfigureWeekendPrice}
        question="Wybierz, jeśli chcesz skonfigurować cenę na weekend"
      />
      <ToggleSwitchComponent
        onToggle={handleChooseStayDuration}
        question="Wybierz czy korzystasz z krótkiego lub długiego pobytu"
      />
      <ToggleSwitchComponent
        onToggle={handleConfigureChildPrice}
        question="Wybierz czy chcesz skonfigurować cenę dla dzieci"
      />
      <ToggleSwitchComponent
        onToggle={handleConfigureMealPrice}
        question="Wybierz czy chcesz skonfigurować cenę za wyżywienie"
      />
      <ToggleSwitchComponent
        onToggle={handleConfigureLocalTaxAmount}
        question="Wybierz czy chcesz skonfigurować kwotę podatku lokalnego"
      />
      <ToggleSwitchComponent
        onToggle={handleConfigureBookingRestrictions}
        question="Wybierz czy chcesz skonfigurować ograniczenia rezerwacji"
      />
    </div>
  );
};

export default ToggleSwitchButtonsPanel;
