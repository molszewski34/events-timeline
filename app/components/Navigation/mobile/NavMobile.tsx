'use client';
import React, { useState, useEffect, useRef } from 'react';
import { addDays } from 'date-fns';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import DateTimePicker from 'react-datetime-picker';
import './style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { pl } from 'date-fns/locale';
import SearchBtn from '../SearchBtn/SearchBtn';
import { useSidebarContext } from '@/app/contexts/Sidebar/SidebarProvider';
import { usePathname } from 'next/navigation';
const NavMobile = ({ children }: { children: React.ReactNode }) => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setDaysToShow,
    daysToShow,
  } = useCalendarContext();
  const { setOpenSidebar } = useSidebarContext();

  const pathname = usePathname();

  const hideNavbar =
    pathname === '/price/configuration' || pathname === '/register';

  const [containerWidth, setContainerWidth] = useState<number | null>(null);

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

  const handleButtonClick = () => {
    setShowCalendar(!showCalendar);
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
  };

  const handleSwitchToCurrentDay = () => {
    const today = new Date();
    setStartDate(today);
  };

  return (
    <nav className="flex justify-between bg-white items-center shadow-md md:hidden relative z-50">
      <div className="flex justify-around bg-white items-center h-12">
        <button className="flex justify-around gap-4 p-4">
          <span
            className="material-icon text-2xl"
            onClick={() => setOpenSidebar(true)}
          >
            menu
          </span>
        </button>
        <SearchBtn />
        {!hideNavbar && (
          <div className="relative ">
            <button
              onClick={handleButtonClick}
              className="flex gap-6 items-center cursor-pointer bg-white   p-4"
            >
              <div className="flex flex-col text-xs text-left">
                <div className="flex">
                  {formattedStartDate}
                  {`${endDateFormat[0]} ${endDateFormat[1]}`}
                </div>
                <div className="">{endDateFormat[2]}</div>
              </div>
              <span className=" flex items-center justify-center material-icon text-lg bg-gray-300 h-5 w-5 rounded-sm">
                expand_more
              </span>
            </button>
          </div>
        )}
        <div className="absolute top-0 right-0 ">
          {showCalendar && (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              locale={pl}
              inline
              className="mt-6"
            />
          )}
        </div>
      </div>

      {children}
    </nav>
  );
};

export default NavMobile;
