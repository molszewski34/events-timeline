import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
const DeleteBtn = () => {
  const { isEditing, setOverlayDelete, setIsDeleting } = useCalendarContext();
  return (
    <div>
      {isEditing && (
        <button
          className="w-12 h-12 hover:bg-gray-100 rounded-full"
          onClick={() => {
            setOverlayDelete(true);
            setIsDeleting(true);
          }}
        >
          <i className="text-red-600 text-2xl  ">delete_outline</i>
        </button>
      )}
    </div>
  );
};

export default DeleteBtn;
