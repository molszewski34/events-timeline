'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

const Price = () => {
  const {
    daysBetween,
    totalNumOfGuests,
    localTax,
    includedTax,
    formData,
    price,
    setPrice,
    tax,
  } = useAddReservationContext();

  useEffect(() => {
    let finalPrice =
      daysBetween * totalNumOfGuests * 65 - formData.paymentOnPlace;

    if (includedTax) {
      finalPrice += tax;
    }
    setPrice(finalPrice);
  }, [
    daysBetween,
    totalNumOfGuests,
    formData.selectedRoom,
    formData.advancePayment,
    formData.deposit,
    formData.paymentOnPlace,
    localTax,
    includedTax,
  ]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^0-9,]/g, '');
    event.target.value = filteredValue; // Directly set the filtered value to the input
  };

  return (
    <div className="">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm  text-gray-500">Cena końcowa</h2>
        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm">
          <input
            className=" w-full pl-2 py-1 text-xs text-right"
            value={price}
            type="text"
            aria-label="Finalna cena"
            disabled
          />
          <p className="text-gray-400 text-sm mr-2">PLN</p>
          <button className="w-8 h-8 rounded-sm rounded-l-none material-icon p-2 bg-green-600 text-sm text-white text-center">
            calculate
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm  text-gray-500">Cena za dobę</h2>
        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm">
          <input
            className="w-full pl-2 py-2 text-xs text-right"
            value={formData.selectedRoom.roomPrice}
            type="text"
            aria-label="Cena za dobę"
            onChange={handleChange}
          />
          <p className="text-gray-400 pr-12 text-sm">PLN</p>
        </form>
      </div>
    </div>
  );
};

export default Price;
