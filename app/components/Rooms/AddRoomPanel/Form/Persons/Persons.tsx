import React, { useState, useEffect } from 'react';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { AgeOfKids } from '@/app/contexts/AddReservation/types';
import { RoomFormData } from '@/app/contexts/AddRoom/types';
const Persons: React.FC = () => {
  const { roomFormData, setRoomFormData } = useAddRoomContext();

  const handleNumOfPersonsIncrement = () => {
    setRoomFormData((prevData: RoomFormData) => ({
      ...prevData,
      roomNumOfPersons: Math.max(roomFormData.roomNumOfPersons + 1),
    }));
  };
  const handleNumOfPersonsDecrement = () => {
    setRoomFormData((prevData: RoomFormData) => ({
      ...prevData,
      roomNumOfPersons: Math.max(roomFormData.roomNumOfPersons - 1, 0),
    }));
  };
  const handleRoomAdditionalPersonsDecrement = () => {
    setRoomFormData((prevData: RoomFormData) => ({
      ...prevData,
      roomAdditionalPersons: Math.max(roomFormData.roomAdditionalPersons + 1),
    }));
  };
  const handleRoomAdditionalPersonsIncrement = () => {
    setRoomFormData((prevData: RoomFormData) => ({
      ...prevData,
      roomAdditionalPersons: Math.max(
        roomFormData.roomAdditionalPersons - 1,
        0
      ),
    }));
  };

  return (
    <main className="flex flex-col gap-2 mt-1">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm text-gray-600">Ilość osób</h2>
          <form className={`border border-gray-300 flex justify-between p-1 `}>
            <button
              onClick={handleNumOfPersonsDecrement}
              type="button"
              className="w-8 bg-gray-300 rounded-sm"
            >
              -
            </button>
            <input
              value={roomFormData.roomNumOfPersons}
              className="text-center w-full"
              type="text"
            />
            <button
              onClick={handleNumOfPersonsIncrement}
              type="button"
              className="w-8 bg-gray-300 rounded-sm"
            >
              +
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-sm text-gray-600">Dostawka</h2>
          <form
            className={`border border-gray-300 flex justify-between p-1 
   
            `}
          >
            <button
              type="button"
              onClick={handleRoomAdditionalPersonsIncrement}
              className="w-8 bg-gray-300 rounded-sm"
            >
              -
            </button>
            <input
              value={roomFormData.roomAdditionalPersons}
              className="text-center w-full"
              type="text"
            />
            <button
              onClick={handleRoomAdditionalPersonsDecrement}
              type="button"
              className="w-8 bg-gray-300 rounded-sm"
            >
              +
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Persons;
