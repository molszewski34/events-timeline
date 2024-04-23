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
          type="text"
          label=""
          placeholder="Wpisz imię i nazwisko głównego gościa"
          formDataKey="mainGuest"
        />
        <Field
          type="text"
          label="Ulica"
          placeholder=""
          formDataKey="mainGuest"
        />
        <div className="grid grid-cols-2 gap-2">
          <Field
            type="text"
            label="Numer domu"
            placeholder=""
            formDataKey="houseNumber"
          />
          <Field
            type="text"
            label="Numer mieszkania"
            placeholder=""
            formDataKey="apartmentNumber"
          />
        </div>
        <Field
          type="text"
          label="Miasto"
          placeholder=""
          formDataKey="apartmentNumber"
        />
        <Field
          type="text"
          label="Kod pocztowy"
          placeholder=""
          formDataKey="apartmentNumber"
        />
        <CountriesList />
        <Field
          type="text"
          label="Paszport"
          placeholder=""
          formDataKey="apartmentNumber"
        />
      </section>
      <section className="flex flex-col gap-2">
        <SectionHeader title="Firma" />
        <Field
          type="text"
          label=""
          placeholder="Wprowadź nazwe firmy"
          formDataKey="company"
        />
      </section>
    </main>
  );
};

export default Client;
