import React, { useState } from 'react';

interface AgeOfKids {
  [index: number]: number;
}

const NumOfGuests: React.FC = () => {
  const [numOfKids, setNumOfKids] = useState<number>(0);
  const [ageOfKids, setAgeOfKids] = useState<AgeOfKids>({});

  console.log(ageOfKids);
  const handleIncrement = () => {
    setNumOfKids(numOfKids + 1);
  };

  const handleDecrement = () => {
    setNumOfKids(Math.max(numOfKids - 1, 0)); // Ensure we don't go below 0
  };

  const handleAgeIncrement = (index: number) => {
    setAgeOfKids((prevState) => {
      const currentValue = (prevState[index] || 0) + 1;
      return { ...prevState, [index]: currentValue };
    });
  };

  const handleAgeDecrement = (index: number) => {
    setAgeOfKids((prevState) => ({
      ...prevState,
      [index]: Math.max((prevState[index] || 0) - 1, 0),
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-gray-400">Dorośli</h2>
        <form className="border border-gray-300 flex justify-between p-1">
          <button className="w-8 bg-gray-300 rounded-sm">-</button>
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
        <div key={index} className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-gray-400">
            Wiek {`(Dziecko ${index + 1})`}
          </h2>
          <form className="border border-gray-300 flex justify-between p-1">
            <button
              type="button"
              onClick={() => handleAgeDecrement(index)}
              className="w-8 bg-gray-300 rounded-sm"
            >
              -
            </button>
            <input
              value={ageOfKids[index] || 0}
              className="text-center w-full"
              type="text"
            />
            <button
              onClick={() => handleAgeIncrement(index)}
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
