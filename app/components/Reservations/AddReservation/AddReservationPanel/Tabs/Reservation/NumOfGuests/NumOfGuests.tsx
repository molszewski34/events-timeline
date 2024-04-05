import React from 'react';

const NumOfGuests = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-gray-400">Dorośli</h2>
        <form className="border border-gray-300 flex justify-between p-1">
          <button className="w-8 bg-gray-300 rounded-sm"> -</button>
          <input value={2} className="text-center" type="text" />
          <button className="w-8 bg-gray-300 rounded-sm">+</button>
        </form>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-gray-400">Dzieci</h2>
        <form className="border border-gray-300 flex justify-between p-1">
          <button className="w-8 bg-gray-300 rounded-sm"> -</button>
          <input value={2} className="text-center" type="text" />
          <button className="w-8 bg-gray-300 rounded-sm">+</button>
        </form>
      </div>
    </div>
  );
};

export default NumOfGuests;
