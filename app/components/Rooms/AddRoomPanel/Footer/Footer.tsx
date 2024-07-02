import React from 'react';
import AddRoomSubmitBtn from '../AddRoomSubmitBtn/AddRoomSubmitBtn';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import UpdateRoomButton from '../../UpdateRoomButton/UpdateRoomButton';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { initialRoomFormData } from '@/app/contexts/AddRoom/initialRoomFormData';
const Footer = () => {
  const { isEditing, setIsEditing, setOverlay } = useCalendarContext();
  const { setOpenAddRoom, setRoomFormData } = useAddRoomContext();
  const resetRoomFormData = () => {
    setRoomFormData(initialRoomFormData);
  };
  return (
    <div className="flex items-center">
      <button
        className="flex gap-1 bg-gray-200 hover:bg-gray-300 text-black w-full items-center justify-center py-1 rounded-sm"
        onClick={() => {
          setOpenAddRoom(false);
          setOverlay(false);
          setIsEditing(false);
          resetRoomFormData();
        }}
      >
        Zamknij
      </button>
      {isEditing ? <UpdateRoomButton /> : <AddRoomSubmitBtn />}
    </div>
  );
};

export default Footer;
