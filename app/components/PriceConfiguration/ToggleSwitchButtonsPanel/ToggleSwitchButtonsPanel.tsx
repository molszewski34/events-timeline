import React, { useState } from 'react';
import ToggleSwitchComponent from '../ToggleSwitchButton/ToggleSwitchButton';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import ChooseStayDuration from '../Switches/ChooseStayDuration/ChooseStayDuration';
import ConfigureChildPrice from '../Switches/ConfigureChildPrice/ConfigureChildPrice';
import ConfigureMealPrice from '../Switches/ConfigureMealPrice/ConfigureMealPrice';
import ConfigureLocalTaxAmount from '../Switches/ConfigureLocalTaxAmount/ConfigureLocalTaxAmount';
import { PriceConfiguration } from '@/app/contexts/PriceConfiguration/types';
import { PriceConfigurationProps } from '../types/PriceSettings';
const ToggleSwitchButtonsPanel: React.FC<PriceConfigurationProps> = ({
  data,
}) => {
  const {
    priceSettings,
    setPriceSettings,
    setPartialOccupancyPrice,
    setWeekendPrice,
    setStayDuration,
    setChildPrice,
    setMealPrice,
    setLocalTaxAmount,
    setBookingRestrictions,
  } = usePriceConfigurationContext();

  const handleConfigurePartialOccupancyPrice = (value: boolean) => {
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      partialOccupancyPrice: value,
    }));
  };

  const handleConfigureWeekendPrice = (value: boolean) => {
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      weekendPrice: value,
    }));
  };

  const handleChooseStayDuration = (value: boolean) => {
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      stayDuration: value,
    }));
  };

  const handleConfigureChildPrice = (value: boolean) => {
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      childPrice: value,
    }));
  };

  const handleConfigureMealPrice = (value: boolean) => {
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      mealPrice: value,
    }));
  };

  const handleConfigureLocalTaxAmount = (value: boolean) => {
    setPriceSettings((prevSettings: PriceConfiguration) => ({
      ...prevSettings,
      localTax: value,
    }));
  };

  return (
    <div className="">
      <ToggleSwitchComponent
        onToggle={handleConfigurePartialOccupancyPrice}
        question="Wybierz czy chcesz skonfigurować cenę dla niepełnego obłożenia"
        checked={priceSettings.partialOccupancyPrice}
      />
      <ToggleSwitchComponent
        onToggle={handleConfigureWeekendPrice}
        question="Wybierz, jeśli chcesz skonfigurować cenę na weekend"
        checked={priceSettings.weekendPrice}
      />
      <ToggleSwitchComponent
        onToggle={handleChooseStayDuration}
        question="Wybierz czy korzystasz z krótkiego lub długiego pobytu"
        checked={priceSettings.stayDuration}
      />
      <ChooseStayDuration />
      <ToggleSwitchComponent
        onToggle={handleConfigureChildPrice}
        question="Wybierz czy chcesz skonfigurować cenę dla dzieci"
        checked={priceSettings.childPrice}
      />
      <ConfigureChildPrice />
      <ToggleSwitchComponent
        onToggle={handleConfigureMealPrice}
        question="Wybierz czy chcesz skonfigurować cenę za wyżywienie"
        checked={priceSettings.mealPrice}
      />
      <ConfigureMealPrice />
      <ToggleSwitchComponent
        onToggle={handleConfigureLocalTaxAmount}
        question="Wybierz czy chcesz skonfigurować kwotę podatku lokalnego"
        checked={priceSettings.localTax}
      />
      <ConfigureLocalTaxAmount />
    </div>
  );
};

export default ToggleSwitchButtonsPanel;
