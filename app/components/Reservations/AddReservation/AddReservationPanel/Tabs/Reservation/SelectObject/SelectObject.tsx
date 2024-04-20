import React, { useState, useEffect } from 'react';
import { rooms } from '@/app/data/roomsData';
import { Room } from '@/app/data/types';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

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

  const [foundRoom, setFoundRoom] = useState<Room | null>(null);

  // console.log(foundRoom);
  // console.log(selectedRoom);

  useEffect(() => {
    const searchRoomById = () => {
      const room = rooms.find((room) => room.id === selectedRoomId);
      if (room) {
        // setFoundRoom(room);
        // setSelectedroom(room);
        setFormData((prevData: Date) => ({
          ...prevData,
          selectedRoom: room,
        }));
      }
    };

    searchRoomById();
  }, [selectedRoomId]);

  const handleSelectOption = (room: Room) => {
    // setSelectedroom(room);
    // setSelectedRoomId(room.id);
    setFormData((prevData: Date) => ({
      ...prevData,
      selectedRoom: room,
    }));
    setSelectedRoomId(room.id);
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
            {formData.selectedRoom?.roomTypeIcon}
          </span>
        </div>
        {formData.selectedRoom?.roomName}
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
                  {foundRoom.roomTypeIcon}
                </span>
              </div>
              {foundRoom.roomName}
            </button>
          </div>
        </div>
      )}

      {rooms.map((room, index) => (
        <div key={index}>
          {selectedRoom?.roomName !== room.roomName && (
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
                      {room.roomTypeIcon}
                    </span>
                  </div>
                  {room.roomName}
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
