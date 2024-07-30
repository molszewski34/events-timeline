import React from 'react';
import ToggleSwitchComponent from '../ToggleSwitchButton/ToggleSwitchButton';
const ToggleSwitchButtonsPanel = () => {
  return (
    <div className="p-4">
      <ToggleSwitchComponent question="Wybierz czy chcesz skonfigurować cenę dla niepełnego obłożenia" />
      <ToggleSwitchComponent question="Wybierz, jeśli chcesz skonfigurować cenę na weekend" />
      <ToggleSwitchComponent question="Wybierz czy korzystasz z krótkiego lub długiego pobytu" />
      <ToggleSwitchComponent question="Wybierz czy chcesz skonfigurować cenę dla dzieci" />
      <ToggleSwitchComponent question="Wybierz czy chcesz skonfigurować cenę za wyżywienie" />
      <ToggleSwitchComponent question="Wybierz czy chcesz skonfigurować kwotę podatku lokalnego" />
      <ToggleSwitchComponent question="Wybierz czy chcesz skonfigurować ograniczenia rezerwacji" />
    </div>
  );
};

export default ToggleSwitchButtonsPanel;
