import React from 'react';
import { rooms } from '@/app/data/roomsData';
const Price = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-gray-400">Finalna cena</h2>
        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm">
          <input className=" w-full pl-2" type="text" />
          <p className="text-gray-400">PLN</p>
          <button className="w-8  rounded-sm rounded-l-none material-icon p-2 bg-green-400 text-xl text-white text-center">
            calculate
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-gray-400">Finalna cena</h2>
        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm p-2">
          <input className=" w-full pl-2" type="text" />
          <p className="text-gray-400 pr-8">PLN</p>
        </form>
      </div>
    </div>
  );
};

export default Price;
