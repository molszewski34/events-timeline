import React, { useState, useEffect } from 'react';
import { Room } from '@/app/data/types';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { FetchedRooms } from '@/app/components/RenderRows/types';

const SelectObject = () => {
  const {
    selectedRoom,
    setSelectedroom,
    roomListOpen,
    setRoomListOpen,
    selectedRoomId,
    setSelectedRoomId,
    formData,
    setFormData,
  } = useAddReservationContext();

  const { rooms } = useAddRoomContext();

  const [foundRoom, setFoundRoom] = useState<FetchedRooms | null>(null);

  useEffect(() => {
    const searchRoomById = () => {
      const room = rooms.find(
        (room: FetchedRooms) => room.id === formData.selectedRoomId
      );
      if (room) {
        setFormData((prevData: Date) => ({
          ...prevData,
          selectedRoom: room,
        }));
      }
    };

    searchRoomById();
  }, [formData.selectedRoomId]);

  const handleSelectOption = (room: FetchedRooms) => {
    setFormData((prevData: Date) => ({
      ...prevData,
      selectedRoom: room,
      selectedRoomId: room.id,
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        className="flex items-center gap-2 bg-gray-100 p-2 rounded-sm"
        onClick={() => setRoomListOpen(!roomListOpen)}
      >
        <div
          className={`w-8 h-8 rounded-full flex justify-center items-center`}
        >
          <span className="material-icon text-green-500">
            {formData.selectedRoom?.type_icon}
          </span>
        </div>
        {formData.selectedRoom?.name}
      </button>

      {foundRoom && (
        <div className={`flex ${roomListOpen ? '' : 'h-0 overflow-hidden'}`}>
          <div className="flex bg-white hover:bg-slate-200">
            <button
              className="flex items-center gap-2  p-2 rounded-sm w-full"
              onClick={() => {
                handleSelectOption(foundRoom);
                setRoomListOpen(false);
              }}
            >
              <div
                className={`w-8 h-8 rounded-full flex justify-center items-center`}
              >
                <span className="material-icon text-green-500">
                  {foundRoom.type_icon}
                </span>
              </div>
              {foundRoom.name}
            </button>
          </div>
        </div>
      )}

      {rooms.map((room: FetchedRooms, index: number) => (
        <div key={index}>
          {selectedRoom?.roomName !== room.name && (
            <div className={`${roomListOpen ? '' : 'h-0 overflow-hidden'}`}>
              <div className="flex bg-white hover:bg-slate-200">
                <button
                  className="flex items-center gap-2  p-2 rounded-sm w-full"
                  onClick={() => {
                    handleSelectOption(room);
                    setRoomListOpen(false);
                  }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex justify-center items-center`}
                  >
                    <span className="material-icon text-green-500">
                      {room.type_icon}
                    </span>
                  </div>
                  {room.name}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SelectObject;
