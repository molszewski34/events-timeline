'use client';
import React from 'react';
import SectionHeader from '../../Headers/SectionHeader';
import Field from './Field/Field';
import CountriesList from './CountriesList/CountriesList';
const Client = () => {
  return (
    <main className="flex flex-col gap-2">
      <section className="flex flex-col gap-2">
        <SectionHeader title="Główny gość" />
        <Field
          label=""
          placeholder="Wpisz imię i nazwisko głównego gościa"
          formDataKey="mainGuest"
        />
        <Field label="Ulica" placeholder="" formDataKey="mainGuest" />
        <div className="grid grid-cols-2 gap-2">
          <Field label="Numer domu" placeholder="" formDataKey="houseNumber" />
          <Field
            label="Numer mieszkania"
            placeholder=""
            formDataKey="apartmentNumber"
          />
        </div>
        <Field label="Miasto" placeholder="" formDataKey="apartmentNumber" />
        <Field
          label="Kod pocztowy"
          placeholder=""
          formDataKey="apartmentNumber"
        />
        <CountriesList />
        <Field label="Paszport" placeholder="" formDataKey="apartmentNumber" />
      </section>
    </main>
  );
};

export default Client;
