'use client';
import React, { useState, useEffect } from 'react';
import { addDays } from 'date-fns';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import DateTimePicker from 'react-datetime-picker';
import './style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { pl } from 'date-fns/locale';
const NavMobile = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setDaysToShow,
    daysToShow,
  } = useCalendarContext();

  console.log(daysToShow);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    return new Date(date).toLocaleDateString('pl-PL', options);
  };

  const startDateFormat = formatDate(startDate).split(' ');
  const endDateFormat = formatDate(endDate).split(' ');

  const formattedStartDate =
    startDateFormat[1] === endDateFormat[1] &&
    startDateFormat[2] === endDateFormat[2]
      ? `${startDateFormat[0]} ${startDateFormat[1]} -`
      : `${startDateFormat[0]} ${startDateFormat[1]} ${startDateFormat[2]} -`;

  const formattedEndDate = `${endDateFormat[0]} ${endDateFormat[1]} ${endDateFormat[2]}`;

  const handleDateClick = () => {
    setShowDateTimePicker(true);
  };

  const handleButtonClick = () => {
    setShowCalendar(true);
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newDaysToShow = Math.floor(windowWidth / 50);
      setDaysToShow(newDaysToShow);
      setEndDate((prevEndDate: Date) => addDays(startDate, newDaysToShow));
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [startDate, setDaysToShow]);

  const handleDateChange = (date: Date) => {
    setStartDate(date);
    setShowCalendar(false);
    console.log(`start date ${startDate}`);
    console.log(`send date ${endDate}`);
  };

  return (
    <nav className="flex justify-between bg-gray-100 items-center shadow-md">
      <div className="flex justify-around bg-gray-100 items-center">
        <button className="flex justify-around gap-4 p-4">
          <span className="material-icon text-2xl">menu</span>
        </button>
        <div className="relative">
          <button
            onClick={handleButtonClick}
            className="flex gap-2 items-center cursor-pointer bg-gray-100 hover:bg-gray-200 p-4"
          >
            <div className="flex flex-col text-xs text-left">
              <div className="flex">
                {formattedStartDate}
                {`${endDateFormat[0]} ${endDateFormat[1]}`}
              </div>
              <div className="">{endDateFormat[2]}</div>
            </div>
            <span className="material-icon text-lg">arrow_drop_down</span>
          </button>
          {showCalendar && (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              locale={pl}
              inline
            />
          )}
        </div>
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
