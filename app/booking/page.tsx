'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function Home() {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const formattedMonth = format(now, 'MMMM');
    const formattedYear = format(now, 'yyyy');
    const formattedDate = format(now, 'MMMM yyyy');
    setMonth(formattedMonth);
    setYear(formattedYear);
    setDate(formattedDate);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100  mt-6">
      <div className="p-6 bg-white rounded shadow-md w-full mx-3">
        <label
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs"
          htmlFor=""
          onClick={openModal}
        >
          <input type="text" id="date" value={date} readOnly />
          <i>calendar_today</i>
        </label>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white   shadow-lg w-1/3 flex flex-col items-center justify-center">
            <h2 className=" text-2xl bg-green-600 text-white text-center w-full py-4">
              {month}
            </h2>
            <p className="flex py-4 mt-2 text-xl font-bold">{year}</p>
            <button
              onClick={closeModal}
              // className="mt-4 inline-flex justify-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              className="py-2 px-3 bg-green-600 text-white rounded-t-full text-4xl"
            >
              <i>check</i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
