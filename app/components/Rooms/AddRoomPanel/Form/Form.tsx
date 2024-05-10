import React from 'react';
import SectionHeader from '../Headers/SectionHeader';
import BasicInformations from './BasicInformations/BasicInformations';
import Persons from './Persons/Persons';
import Beds from './Beds/Beds';
import RoomColor from './RoomColor/RoomColor';
import RoomLocation from './RoomLocalation/RoomLocation';

const Form = () => {
  return (
    <div className="flex flex-col gap-2 h-[600px] overflow-y-auto pr-2">
      <SectionHeader title="Podstawowe informacje" />
      <BasicInformations />
      <SectionHeader title="Osoby" />
      <Persons />
      <Beds />
      <RoomColor />
      <RoomLocation />
    </div>
  );
};

export default Form;
