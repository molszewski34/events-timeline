'use client';
import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';

const NavMobile = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useCalendarContext();

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('pl-PL', options);
  };

  const startDateFormat = formatDate(startDate).split(' ');
  const endDateFormat = formatDate(endDate).split(' ');

  console.log(endDateFormat);

  const formattedStartDate =
    startDateFormat[1] === endDateFormat[1] &&
    startDateFormat[2] === endDateFormat[2]
      ? `${startDateFormat[0]} ${startDateFormat[1]} -`
      : `${startDateFormat[0]} ${startDateFormat[1]} ${startDateFormat[2]} -`;

  const formattedEndDate = `${endDateFormat[0]} ${endDateFormat[1]} ${endDateFormat[2]}`;

  return (
    <nav className="flex justify-between bg-gray-100 items-center ">
      <div className="flex justify-around bg-gray-100 items-center">
        <button className="flex justify-around gap-4 p-4">
          <span className="material-icon text-2xl">menu</span>
        </button>
        <button className="flex gap-2 items-center cursor-pointer bg-gray-100 hover:bg-gray-200 p-4">
          <div className="flex flex-col text-xs text-left">
            <div className="flex">
              {formattedStartDate}
              {`${endDateFormat[0]} ${endDateFormat[1]}`}
            </div>
            <div className="">{endDateFormat[2]}</div>
          </div>

          <span className="material-icon text-lg">arrow_drop_down</span>
        </button>
      </div>
      <div className="flex gap-4 text-2xl p-4">
        <button className="material-icon ">search</button>
        <button className="material-icon ">sync</button>
        <button className="material-icon ">calendar_month</button>
        <button className="material-icon ">notifications</button>
      </div>
    </nav>
  );
};

export default NavMobile;
