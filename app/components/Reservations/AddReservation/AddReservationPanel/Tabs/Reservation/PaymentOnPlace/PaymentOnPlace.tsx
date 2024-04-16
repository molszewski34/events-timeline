import React, { useState } from 'react';
import Header from './Header';
import Form from './Form';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

const PaymentOnPlace = () => {
  const {
    paymentOnPlace,
    setPaymentOnPlace,
    deposit,
    setDeposit,
    localTax,
    setLocalTax,
    includedTax,
    setIncludeTax,
  } = useAddReservationContext();

  return (
    <main>
      <div className="flex justify-between items-center gap-1 flex-nowrap ">
        <h2 className="font-semibold text-gray-400 w-full">
          Płatność na miejscu
        </h2>
        <hr className="bg-gray-70000 w-full" />
      </div>
      <Form value={paymentOnPlace} onChange={setPaymentOnPlace} />
      <div className="flex justify-between items-center gap-1 flex-nowrap ">
        <Header title={'Depozyt'} />
      </div>
      <Form value={deposit} onChange={setDeposit} />
      <div className="flex justify-between items-center gap-1 flex-nowrap ">
        <Header title={'Lokalny podatek'} />
      </div>
      <div className="flex flex-col gap-2">
        <Form value={localTax} onChange={setLocalTax} />
        <label
          className="text-xs flex items-center gap-2 justify-end"
          htmlFor="tax"
        >
          <input
            type="checkbox"
            name=""
            id="tax"
            checked={includedTax}
            onChange={(e) => setIncludeTax(e.target.checked)}
          />
          Wlicz podatek do ceny
        </label>
      </div>
    </main>
  );
};

export default PaymentOnPlace;
