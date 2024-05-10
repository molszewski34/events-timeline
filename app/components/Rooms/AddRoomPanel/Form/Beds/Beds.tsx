import React, { useState, useEffect } from 'react';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { AgeOfKids } from '@/app/contexts/AddReservation/types';
import { RoomFormData } from '@/app/contexts/AddRoom/types';
const Beds: React.FC = () => {
  const { roomFormData, setRoomFormData } = useAddRoomContext();

  const handleRoomNumOfSingleBedsIncrement = () => {
    setRoomFormData((prevData: RoomFormData) => ({
      ...prevData,
      roomNumOfSingleBeds: Math.max(roomFormData.roomNumOfSingleBeds + 1),
    }));
  };
  const handleRoomNumOfSingleBedsDecrement = () => {
    setRoomFormData((prevData: RoomFormData) => ({
      ...prevData,
      roomNumOfSingleBeds: Math.max(roomFormData.roomNumOfSingleBeds - 1, 0),
    }));
  };
  const handleRoomNumOfDoubleBedsIncrement = () => {
    setRoomFormData((prevData: RoomFormData) => ({
      ...prevData,
      roomAdditionalPersons: Math.max(roomFormData.roomAdditionalPersons + 1),
    }));
  };
  const handleRoomNumOfDoubleBedsDecrement = () => {
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
          <h2 className="text-sm text-gray-600">Ilość pojedynczych łóżek</h2>
          <form className={`border border-gray-300 flex justify-between p-1 `}>
            <button
              onClick={handleRoomNumOfSingleBedsDecrement}
              type="button"
              className="w-8 bg-gray-300 rounded-sm"
            >
              -
            </button>
            <input
              value={roomFormData.roomNumOfSingleBeds}
              className="text-center w-full"
              type="text"
            />
            <button
              onClick={handleRoomNumOfSingleBedsIncrement}
              type="button"
              className="w-8 bg-gray-300 rounded-sm"
            >
              +
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-sm text-gray-600">Ilość podwójnych łóżek</h2>
          <form
            className={`border border-gray-300 flex justify-between p-1 
   
            `}
          >
            <button
              type="button"
              onClick={handleRoomNumOfDoubleBedsDecrement}
              className="w-8 bg-gray-300 rounded-sm"
            >
              -
            </button>
            <input
              value={roomFormData.roomNumOfDoubleBeds}
              className="text-center w-full"
              type="text"
            />
            <button
              onClick={handleRoomNumOfDoubleBedsIncrement}
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

export default Beds;
