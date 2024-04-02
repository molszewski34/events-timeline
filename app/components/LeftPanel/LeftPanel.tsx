import React from 'react';
import { rooms } from '@/app/data/roomsData';

const LeftPanel = () => {
  return (
    <div className="fixed left-0 top-[13.4vh] bottom-0 bg-gray-100 z-[99] min-w-30 flex flex-col">
      {rooms.map((room) => (
        <div className="h-[50px] text-xs text-left p-2 border border-gray-200 gap-1">
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
