'use client';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from './DatePicker/DatePicker';
import NumOfNights from './NumOfNights/NumOfNights';
import BookingStatus from './BookingStatus/BookingStatus';
import NumOfGuests from './NumOfGuests/NumOfGuests';
import SectionHeader from '../../Headers/SectionHeader';
import SelectObject from './SelectObject/SelectObject';
import Price from './Price/Price';
import AdvancePayment from './AdvancePayment/AdvancePayment';
import PaymentOnPlace from './PaymentOnPlace/PaymentOnPlace';

const Reservation = () => {
  return (
    <main className="flex flex-col gap-2">
      <section className="flex flex-col gap-2">
        <SectionHeader title="Termin" />
        <DatePicker />
        <NumOfNights />
      </section>
      <section className="flex flex-col gap-2">
        <SectionHeader title="Status" />
        <BookingStatus />
      </section>
      <section className="flex flex-col gap-2">
        <SectionHeader title="Liczba gości" />
        <NumOfGuests />
      </section>
      <section className="flex flex-col gap-2">
        <SectionHeader title="Obiekt" />
        <SelectObject />
      </section>
      <section className="flex flex-col gap-2">
        <SectionHeader title="Cena" />
        <Price />
      </section>
      <AdvancePayment />
      <PaymentOnPlace />
    </main>
  );
};

export default Reservation;
