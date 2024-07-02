import React from 'react';
import AddRoomSubmitBtn from '../AddRoomSubmitBtn/AddRoomSubmitBtn';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import UpdateRoomButton from '../../UpdateRoomButton/UpdateRoomButton';

const Footer = () => {
  const { isEditing } = useCalendarContext();

  return (
    <div className="flex items-center">
      <button className="flex gap-1 bg-gray-200 hover:bg-gray-300 text-black w-full items-center justify-center py-1 rounded-sm">
        Zamknij
      </button>
      {isEditing ? <UpdateRoomButton /> : <AddRoomSubmitBtn />}
    </div>
  );
};

export default Footer;
