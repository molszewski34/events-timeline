import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
const DeleteRoomBtn = () => {
  const { isEditing, setOverlayDelete, setIsDeletingRoom } =
    useCalendarContext();
  const { setOpenDeletePopup } = useAddRoomContext();
  return (
    <div
      className="flex absolute bottom-4 right-0 bg-white rounded-sm py-2 shadow-[1px_5px_7px_0px_#999aa7] items-center w-[140px] z-[9999]"
      style={{ zIndex: 9999 }}
    >
      <button
        className="flex items-center gap-2 bg-white px-1 py-1 hover:bg-gray-100 w-full text-left"
        onClick={() => {
          setOverlayDelete(true);
          setIsDeletingRoom(true);
          setOpenDeletePopup(false);
        }}
      >
        <i className="text-red-500 text-2xl">delete_outline</i>
        <p className="text-black w-full">Usuń pokój</p>
      </button>
    </div>
  );
};

export default DeleteRoomBtn;
