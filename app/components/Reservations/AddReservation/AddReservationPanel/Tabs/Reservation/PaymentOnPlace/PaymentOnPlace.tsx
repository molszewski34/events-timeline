import React, { useState, useEffect } from 'react';
import Label from '../../../Headers/Label';

import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

const PaymentOnPlace = () => {
  const {
    includedTax,
    setIncludedTax,
    formData,
    setFormData,
    price,
    tax,
    setTax,
  } = useAddReservationContext();

  console.log(tax);

  useEffect(() => {
    if (!includedTax) {
      const tax = price * formData.localTax;
      setTax(tax);
    }
  }, [price, includedTax]);

  return (
    <main>
      <div className="flex justify-between items-center gap-1 flex-nowrap ">
        <h2 className="font-semibold text-gray-400 w-full">
          Płatność na miejscu
        </h2>
        <hr className="bg-gray-70000 w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm ">
          <input
            className="w-full pl-2 py-2"
            type="text"
            value={formData.paymentOnPlace}
            onChange={(event) => {
              setFormData((prevData: FormData) => ({
                ...prevData,
                paymentOnPlace: event.target.value,
              }));
            }}
          />
          <p className="text-gray-400 pr-12">PLN</p>
        </form>
      </div>
      <div className="flex justify-between items-center gap-1 flex-nowrap ">
        <Label title={'Depozyt'} />
      </div>
      <div className="flex flex-col gap-2">
        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm ">
          <input
            className="w-full pl-2 py-2"
            type="text"
            value={formData.deposit}
            onChange={(event) => {
              setFormData((prevData: FormData) => ({
                ...prevData,
                deposit: event.target.value,
              }));
            }}
          />
          <p className="text-gray-400 pr-12">PLN</p>
        </form>
      </div>
      <div className="flex justify-between items-center gap-1 flex-nowrap ">
        <Label title={'Lokalny podatek'} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm ">
            <input
              className="w-full pl-2 py-2"
              type="text"
              value={tax.toFixed(2)}
              disabled
            />
          </form>
        </div>
        <label
          className="text-xs flex items-center gap-2 justify-end"
          htmlFor="tax"
        >
          <input
            type="checkbox"
            name=""
            id="tax"
            checked={includedTax}
            onChange={(e) => setIncludedTax(e.target.checked)}
          />
          Wlicz podatek do ceny
        </label>
      </div>
    </main>
  );
};

export default PaymentOnPlace;
