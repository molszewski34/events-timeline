import React, { useState } from 'react';

const NumOfGuests = () => {
  const [numOfKids, setNumOfKids] = useState(0);
  const [ageOfKids, setAgeOfKids] = useState(0);

  const handleIncrement = () => {
    setNumOfKids(numOfKids + 1);
  };

  const handleDecrement = () => {
    setNumOfKids(numOfKids - 1); // Nie chcemy mieć mniej niż 2 inputy
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-gray-400">Dorośli</h2>
        <form className="border border-gray-300 flex justify-between p-1">
          <button className="w-8 bg-gray-300 rounded-sm"> -</button>
          <input value={2} className="text-center w-full" type="text" />
          <button className="w-8 bg-gray-300 rounded-sm">+</button>
        </form>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-gray-400">Dzieci</h2>
        <form className="border border-gray-300 flex justify-between p-1">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-8 bg-gray-300 rounded-sm"
          >
            -
          </button>
          <input value={numOfKids} className="text-center w-full" type="text" />
          <button
            onClick={handleIncrement}
            type="button"
            className="w-8 bg-gray-300 rounded-sm"
          >
            +
          </button>
        </form>
      </div>
      {[...Array(numOfKids)].map((_, index) => (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-gray-400">Dziecko</h2>
          <form className="border border-gray-300 flex justify-between p-1">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-8 bg-gray-300 rounded-sm"
            >
              -
            </button>
            <input
              value={ageOfKids}
              className="text-center w-full"
              type="text"
            />
            <button
              onClick={handleIncrement}
              type="button"
              className="w-8 bg-gray-300 rounded-sm"
            >
              +
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default NumOfGuests;
