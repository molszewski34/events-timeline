import React from 'react';
import useHandleCheckboxChange from './hooks/useHandleCheckboxChange';
import useHandleRemoveRoom from './hooks/useHandleRemoveRoom';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import NextRoom from './NextRoom/NextRoom';

interface ModalProps {
  rooms: [];
  isNextRoomVisible: boolean;
  room: string;
  id: string;
  name: string;
}

const Modal: React.FC<ModalProps> = ({ rooms, isNextRoomVisible }) => {
  const { selectedRooms } = useSetPriceContext();

  const { handleCheckboxChange } = useHandleCheckboxChange(rooms);
  const { handleRemoveRoom } = useHandleRemoveRoom();
  return (
    <div className="flex flex-col mb-4 gap-3 relative">
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          disabled={selectedRooms.length === 0 || isNextRoomVisible}
          className="accent-green-600"
        />
        Zaznacz pokoje o tej samej pojemności
      </label>
      {isNextRoomVisible && <NextRoom id="id" />}

      <div className="flex flex-wrap gap-1 ml-3">
        {selectedRooms.map((room: ModalProps) => (
          <button
            key={room.id}
            className="flex flex-nowrap gap-2 items-center justify-between text-xs text-white bg-[#00a541] py-1 px-2 rounded h-[23px]"
            onClick={() => handleRemoveRoom(room.id)}
          >
            {room.name}
            <i className="text-sm">cancel</i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Modal;
