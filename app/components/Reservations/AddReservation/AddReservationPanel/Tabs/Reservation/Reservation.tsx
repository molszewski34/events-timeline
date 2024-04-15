'use client';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from './DatePicker/DatePicker';
import NumOfNights from './NumOfNights/NumOfNights';
import BookingStatus from './BookingStatus/BookingStatus';
import NumOfGuests from './NumOfGuests/NumOfGuests';
import Header from './Header/Header';
import SelectObject from './SelectObject/SelectObject';
import Price from './Price/Price';

const Reservation = () => {
  return (
    <main className="flex flex-col gap-2">
      <section className="flex flex-col gap-2">
        <Header title="Termin" />
        <DatePicker />
        <NumOfNights />
      </section>
      <section className="flex flex-col gap-2">
        <Header title="Status" />
        <BookingStatus />
      </section>
      <section className="flex flex-col gap-2">
        <Header title="Liczba gości" />
        <NumOfGuests />
      </section>
      <section className="flex flex-col gap-2">
        <Header title="Obiekt" />
        <SelectObject />
      </section>
      <section className="flex flex-col gap-2">
        <Header title="Cena" />
        <Price />
      </section>
    </main>
  );
};

export default Reservation;
