import React from 'react';

const RecalculatePrices = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-gray-500 text-xs pb-1 border-b border-gray-300 font-bold">
        Przelicz ceny
      </h1>
      <div className="flex justify-between gap-2">
        <input
          className="text-xs border border-gray-300 py-2 px-1 flex-1 text-left rounded-sm"
          type="text"
        />
        <select
          className="flex-1 border border-gray-300 text-xs bg-white pl-2"
          name=""
          id=""
        >
          <option value="amount">Kwota</option>
          <option value="percent">Procent</option>
        </select>
      </div>
      <button
        className="bg-gray-200 text-xs text-gray-600 font-bold h-8"
        disabled
      >
        Przelicz
      </button>
    </div>
  );
};

export default RecalculatePrices;
