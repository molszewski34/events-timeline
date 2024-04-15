import React from 'react';

const PaymentOnPlace = () => {
  return (
    <main>
      <div className="flex justify-between items-center gap-1 flex-nowrap ">
        <h2 className="font-semibold text-gray-400 w-full">
          Płatność na miejscu
        </h2>
        <hr className="bg-gray-70000 w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm bg-gray-200">
          <input className="w-full pl-2 py-2 bg-gray-200" type="text" />
          <p className="text-gray-400 pr-12">PLN</p>
        </form>
      </div>
      <div className="flex justify-between items-center gap-1 flex-nowrap ">
        <h2 className="font-semibold text-gray-400 w-full text-sm">Depozyt</h2>
      </div>
      <div className="flex flex-col gap-2">
        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm ">
          <input className="w-full pl-2 py-2 " type="text" />
          <p className="text-gray-400 pr-12">PLN</p>
        </form>
      </div>
      <div className="flex justify-between items-center gap-1 flex-nowrap ">
        <h2 className="font-semibold text-gray-400 w-full text-sm">
          Lokalny podatek
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm b">
          <input className="w-full pl-2 py-2 " type="text" />
          <p className="text-gray-400 pr-12">PLN</p>
        </form>
        <label
          className="text-xs flex items-center gap-2 justify-end"
          htmlFor="tax"
        >
          <input type="checkbox" name="" id="tax" />
          Wlicz podatek do ceny
        </label>
      </div>
    </main>
  );
};

export default PaymentOnPlace;
