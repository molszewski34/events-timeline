import React, { useState } from 'react';
import './styles.css';
function SetPriceDatePicker() {
  // Pobierz dzisiejszą datę w formacie YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Ustawienie stanu dla obu inputów
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  return (
    <div className="flex justify-between gap-4">
      <div className="flex flex-col gap-2 w-full ">
        <label className="text-sm text-gray-600" htmlFor="start-date">
          Od
        </label>
        <input
          className="border border-gray-300 rounded-sm text-sx p-2"
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-full ">
        <label className="text-sm text-gray-600" htmlFor="end-date">
          Do
        </label>
        <input
          className="border border-gray-300 rounded-sm text-sx p-2"
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SetPriceDatePicker;
