import React from 'react';
import { Room } from '../types';

interface SelectedRoomsProps {
  selectedRooms: Room[];
  onRoomSelect: (room: Room) => void;
}

const SelectedRooms: React.FC<SelectedRoomsProps> = ({
  selectedRooms,
  onRoomSelect,
}) => (
  <div className="flex gap-2">
    {selectedRooms.map((room) => (
      <button
        key={room.id}
        className="flex flex-nowrap gap-2 items-center justify-between text-xs text-white bg-[#00a541] py-1 px-2 rounded h-[23px]"
        onClick={() => onRoomSelect(room)}
      >
        <p className="flex flex-wrap whitespace-nowrap">{room.name}</p>
        <i className="text-sm">cancel</i>
      </button>
    ))}
  </div>
);

export default SelectedRooms;
