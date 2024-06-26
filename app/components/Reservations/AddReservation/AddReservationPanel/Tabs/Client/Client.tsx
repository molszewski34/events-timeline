'use client';
import React, { useState } from 'react';
import SectionHeader from '../../Headers/SectionHeader';
import Field from './Field/Field';
import CountriesList from './CountriesList/CountriesList';
import Footer from '../../Footer/Footer';
const Client = () => {
  const [expandGuestField, setExpandGuestField] = useState(false);
  const [expandCompanyField, setExpandCompanyField] = useState(false);

  return (
    <main className="flex flex-col gap-2">
      <section className="flex flex-col gap-2">
        <SectionHeader title="Główna osoba" />
        <div className="flex justify-between items-center gap-2">
          <Field
            type="text"
            label=""
            placeholder="Wpisz imię i nazwisko głównego gościa"
            formDataKey="mainGuest"
          />
          <button
            className={`material-icons  bg-gray-300 rounded-sm mt-1 ${
              expandGuestField ? 'rotate-180' : ''
            }`}
            onClick={() => setExpandGuestField(!expandGuestField)}
          >
            expand_more
          </button>
        </div>
        <section
          className={`overflow-hidden ${expandGuestField ? 'h-full' : 'h-0'}`}
        >
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
          <Field type="text" label="Miasto" placeholder="" formDataKey="city" />
          <Field
            type="text"
            label="Kod pocztowy"
            placeholder=""
            formDataKey="postCode"
          />

          <CountriesList formDataKey="country" />
          <Field
            type="text"
            label="Paszport"
            placeholder=""
            formDataKey="passport"
          />
        </section>
      </section>
      <Field type="tel" label="Telefon" placeholder="" formDataKey="phone" />
      <Field type="text" label="Email" placeholder="" formDataKey="email" />
      <section className="flex flex-col gap-2">
        <SectionHeader title="Firma" />
        <div className="flex justify-between items-center gap-2">
          <Field
            type="text"
            label=""
            placeholder="Wprowadź nazwe firmy"
            formDataKey="company"
          />
          <button
            className={`material-icons  bg-gray-300 rounded-sm mt-1 ${
              expandCompanyField ? 'rotate-180' : ''
            }`}
            onClick={() => setExpandCompanyField(!expandCompanyField)}
          >
            expand_more
          </button>
        </div>
        <section
          className={`overflow-hidden flex flex-col gap-2 ${
            expandCompanyField ? 'h-full' : 'h-0'
          }`}
        >
          <Field
            type="text"
            label="Ulica"
            placeholder=""
            formDataKey="company_street"
          />
          <Field
            type="text"
            label="Miasto"
            placeholder=""
            formDataKey="company_city"
          />
          <Field
            type="text"
            label="Kod pocztowy"
            placeholder=""
            formDataKey="company_postCode"
          />
          <CountriesList formDataKey="company_country" />
          <Field
            type="text"
            label="NIP"
            placeholder=""
            formDataKey="company_nip"
          />
        </section>
      </section>
      <Footer />
    </main>
  );
};

export default Client;
