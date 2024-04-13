import React from 'react';
import { rooms } from '@/app/data/roomsData';

const LeftPanel = () => {
  return (
    <div className="fixed   bg-gray-100 z-[99] min-w-[100px] flex flex-col">
      <div className="h-[50px] text-xs text-left p-2 border-2 border-l-0 text-gray-500">
        <i className="material-icons text-2xl">filter_alt</i>
      </div>
      {rooms.map((room) => (
        <div className="h-[50px] text-xs text-left p-2 shadow-sm border-r-2 gap-1">
          <div className="flex gap-1 items-center">
            <p className="material-icon text-gray-500">{room.roomTypeIcon}</p>
            <div className="flex items-center">
              <p className="material-icon text-gray-500 text-base">person</p>
              <p>{room.roomGuests}</p>
            </div>
          </div>
          {room.roomName}
        </div>
      ))}
    </div>
  );
};

export default LeftPanel;
