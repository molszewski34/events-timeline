'use client';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from './DatePicker/DatePicker';
import NumOfNights from './NumOfNights/NumOfNights';
import BookingStatus from './BookingStatus/BookingStatus';
import NumOfGuests from './NumOfGuests/NumOfGuests';
import Header from './Header/Header';
const Reservation = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Header title="Termin" />
        <DatePicker />
        <NumOfNights />
      </div>
      <div className="flex flex-col gap-2">
        <Header title="Status" />
        <BookingStatus />
      </div>
      <div className="flex flex-col gap-2">
        <Header title="Liczba gości" />
        <NumOfGuests />
      </div>
    </div>
  );
};

export default Reservation;
