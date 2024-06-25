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

  useEffect(() => {
    if (!includedTax) {
      const tax = price * formData.localTax;
      setTax(tax);
    }
  }, [price, includedTax]);

  return (
    <main className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-1 flex-nowrap ">
          <h2 className="font-semibold text-gray-500 w-full text-sm">
            Płatność na miejscu
          </h2>
          <hr className="bg-gray-70000 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm bg-gray-200">
            <input
              className="w-full pl-2 py-2 text-xs text-right bg-gray-200"
              type="text"
              // value={formData.paymentOnPlace }
              value={price - formData.advancePayment}
              readOnly
              onChange={(event) => {
                const value = event.target.value;
                const filteredValue = value.replace(/[^0-9,]/g, '');
                setFormData((prevData: FormData) => ({
                  ...prevData,
                  paymentOnPlace: filteredValue,
                }));
              }}
            />
            <p className="text-gray-400 pr-12 text-sm">PLN</p>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-1 flex-nowrap ">
          <Label title={'Depozyt'} />
        </div>
        <div className="flex flex-col gap-2">
          <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm ">
            <input
              className="w-full pl-2 py-2 text-xs text-right"
              type="text"
              value={formData.deposit}
              onChange={(event) => {
                const value = event.target.value;
                const filteredValue = value.replace(/[^0-9,]/g, '');
                setFormData((prevData: FormData) => ({
                  ...prevData,
                  deposit: filteredValue,
                }));
              }}
            />
            <p className="text-gray-400 pr-12 text-sm">PLN</p>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-1 flex-nowrap ">
          <Label title={'Lokalny podatek'} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm ">
              <input
                className="w-full pl-2 py-2 text-xs text-right"
                type="text"
                value={tax.toFixed(2)}
                disabled
              />
              <p className="text-gray-400 pr-12 text-sm">PLN</p>
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
            W cenie
          </label>
        </div>
      </div>
    </main>
  );
};

export default PaymentOnPlace;
