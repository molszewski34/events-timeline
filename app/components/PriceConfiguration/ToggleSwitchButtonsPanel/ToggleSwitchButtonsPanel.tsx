import React, { useState } from 'react';
import ToggleSwitchComponent from '../ToggleSwitchButton/ToggleSwitchButton';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import ChooseStayDuration from '../Switches/ChooseStayDuration/ChooseStayDuration';
import ConfigureChildPrice from '../Switches/ConfigureChildPrice/ConfigureChildPrice';
import ConfigureMealPrice from '../Switches/ConfigureMealPrice/ConfigureMealPrice';
import ConfigureLocalTaxAmount from '../Switches/ConfigureLocalTaxAmount/ConfigureLocalTaxAmount';

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
      <ChooseStayDuration />
      <ToggleSwitchComponent
        onToggle={handleConfigureChildPrice}
        question="Wybierz czy chcesz skonfigurować cenę dla dzieci"
      />
      <ConfigureChildPrice />
      <ToggleSwitchComponent
        onToggle={handleConfigureMealPrice}
        question="Wybierz czy chcesz skonfigurować cenę za wyżywienie"
      />
      <ConfigureMealPrice />
      <ToggleSwitchComponent
        onToggle={handleConfigureLocalTaxAmount}
        question="Wybierz czy chcesz skonfigurować kwotę podatku lokalnego"
      />
      <ConfigureLocalTaxAmount />
    </div>
  );
};

export default ToggleSwitchButtonsPanel;
