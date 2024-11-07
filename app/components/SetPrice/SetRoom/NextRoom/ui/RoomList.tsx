import React from 'react';
import { Room } from '../types';

interface RoomListProps {
  rooms: Room[];
  onRoomSelect: (room: Room) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onRoomSelect }) => (
  <div className="flex flex-col mt-4">
    {rooms.map((room, index) => (
      <button
        key={room.id}
        className={`p-2 ${
          index !== rooms.length - 1 ? 'border-b border-gray-300' : ''
        } flex items-center gap-1 hover:bg-gray-100 py-1`}
        onClick={() => onRoomSelect(room)}
      >
        <i className="text-green-600">{room.type_icon}</i>
        <span className="text-gray-600 text-xs">{room.name}</span>
        <i className="text-gray-400 text-base">person</i>
        <p className="text-xs">{room.num_of_persons}</p>
      </button>
    ))}
  </div>
);

export default RoomList;
