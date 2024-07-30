import React from 'react';
import SectionHeader from '../../../../utils/SectionHeader';
import CountriesList from './CountriesList/CountriesList';
import Field from '../Field/Field';

const RoomLocation = () => {
  return (
    <main>
      <SectionHeader title="Dane adresowe" />
      <CountriesList />
      <Field formDataKey="roomAdress" label="Ulica" value="Uzupełnij adres" />
      <Field formDataKey="roomPostCode" label="Kod pocztowy" />
      <Field formDataKey="roomCity" label="Miasto" value="Uzupełnij miasto" />
    </main>
  );
};

export default RoomLocation;
