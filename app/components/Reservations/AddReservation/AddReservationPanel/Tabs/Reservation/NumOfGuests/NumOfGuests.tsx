import React, { useState, useEffect } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { AgeOfKids } from '@/app/contexts/AddReservation/types';

const NumOfGuests: React.FC = () => {
  const {
    ageOfKids,
    setAgeOfKids,
    totalNumOfGuests,
    setTotalNumOfGuests,
    formData,
    setFormData,
  } = useAddReservationContext();

  const { rooms } = useAddRoomContext();

  useEffect(() => {
    setTotalNumOfGuests(formData.numOfKids + formData.numOfAdults);
  }, [formData.numOfKids, formData.numOfAdults]);

  const handleNumOfAdultsIncrement = () => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      numOfAdults: formData.numOfAdults + 1,
      numOfKids: Math.max(formData.numOfKids - 1, 0),
    }));
  };

  const handleNumOfAdultsDecrement = () => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      numOfAdults: Math.max(formData.numOfAdults - 1, 0),
    }));
  };

  const handleNumOfKidsIncrement = () => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      numOfKids: formData.numOfKids + 1,
      numOfAdults: Math.max(formData.numOfAdults - 1, 0),
    }));
  };

  const handleNumOfKidsDecrement = () => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      numOfKids: Math.max(formData.numOfKids - 1, 0),
      numOfAdults: formData.numOfAdults + 1,
    }));
  };

  const handleAgeIncrement = (index: number) => {
    setAgeOfKids((prevState: AgeOfKids) => {
      const currentValue = (prevState[index] || 0) + 1;
      return { ...prevState, [index]: currentValue };
    });
  };

  const handleAgeDecrement = (index: number) => {
    setAgeOfKids((prevState: AgeOfKids) => ({
      ...prevState,
      [index]: Math.max((prevState[index] || 0) - 1, 0),
    }));
  };

  const isExceedingCapacity =
    totalNumOfGuests > formData.selectedRoom.num_of_persons;
  // totalNumOfGuests > formData.selectedRoom.roomGuests;

  return (
    <main className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm text-gray-500">Dorośli</h2>
          <form
            className={`border border-gray-300 flex justify-between p-1 rounded-sm ${
              isExceedingCapacity ? 'border-red-600' : ''
            }`}
          >
            <button
              onClick={handleNumOfAdultsDecrement}
              type="button"
              className="w-8 bg-gray-300 rounded-sm"
            >
              -
            </button>
            <input
              value={formData.numOfAdults}
              className={`text-center w-full text-sm ${
                isExceedingCapacity ? 'text-red-600' : ''
              }`}
              type="text"
            />
            <button
              onClick={handleNumOfAdultsIncrement}
              type="button"
              className="w-8 bg-gray-300 rounded-sm"
            >
              +
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-sm text-gray-500">Dzieci</h2>
          <form
            className={`border border-gray-300 flex justify-between p-1 rounded-sm ${
              isExceedingCapacity ? 'border-red-600' : ''
            }`}
          >
            <button
              type="button"
              onClick={handleNumOfKidsDecrement}
              className="w-8 bg-gray-300 rounded-sm"
            >
              -
            </button>
            <input
              value={formData.numOfKids}
              className={`text-center w-full text-sm ${
                isExceedingCapacity ? 'text-red-600' : ''
              }`}
              type="text"
            />
            <button
              onClick={handleNumOfKidsIncrement}
              type="button"
              className="w-8 bg-gray-300 rounded-sm"
            >
              +
            </button>
          </form>
        </div>
        {[...Array(formData.numOfKids)].map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h2 className="text-sm font-bold text-gray-400">
              Wiek {`(Dziecko ${index + 1})`}
            </h2>
            <form
              className={`border border-gray-300 flex justify-between p-1 ${
                isExceedingCapacity ? 'border-red-600' : ''
              }`}
            >
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
    </main>
  );
};

export default NumOfGuests;
