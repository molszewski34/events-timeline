'use client';
import React, { useState, useEffect } from 'react';
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
      daysBetween * totalNumOfGuests * 65 -
      formData.advancePayment -
      formData.deposit -
      formData.paymentOnPlace;

    if (includedTax) {
      finalPrice += tax;
      setPrice(finalPrice);
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

  return (
    <div className="">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-gray-400">Finalna cena</h2>
        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm">
          <input
            className=" w-full pl-2 py-2"
            value={price}
            type="text"
            aria-label="Finalna cena"
            disabled
          />
          <p className="text-gray-400">PLN</p>
          <button className="w-12  rounded-sm rounded-l-none material-icon p-2 bg-green-400 text-xl text-white text-center">
            calculate
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-gray-400">Cena za dzień</h2>
        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm">
          <input
            className=" w-full pl-2 py-2"
            value={formData.selectedRoom.roomPrice}
            type="text"
            aria-label="Cena za dzień"
          />
          <p className="text-gray-400 pr-12">PLN</p>
        </form>
      </div>
    </div>
  );
};

export default Price;
