import React, { useState, useEffect } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { Database } from '@/types/supabase';

const SelectObject = ({ id }: { id: string }) => {
  const {
    roomListOpen,
    setRoomListOpen,

    formData,
    setFormData,
  } = useAddReservationContext();
  type Room = Database['public']['Tables']['rooms']['Row'];

  const supabase = useSupabaseBrowser();
  const { data: rooms } = useQuery(fetchRooms(supabase, id));

  const [foundRoom, setFoundRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (rooms && formData.selectedRoomId) {
      const searchRoomById = () => {
        const room = rooms.find(
          (room: Room) => room.id === formData.selectedRoomId
        );
        if (room) {
          setFormData((prevData: Room) => ({
            ...prevData,
            selectedRoom: room,
          }));
        }
      };

      searchRoomById();
    }
  }, [rooms, formData.selectedRoomId]);

  const handleSelectOption = (room: Room) => {
    setFormData((prevData: Room) => ({
      ...prevData,
      selectedRoom: room,
      selectedRoomId: room.id,
    }));
  };

  console.log(formData.selectedRoomId);

  return (
    <div className="flex flex-col gap-2">
      <button
        className="flex items-center gap-2 bg-gray-100 p-1 rounded-sm text-sm justify-between"
        onClick={() => setRoomListOpen(!roomListOpen)}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full flex justify-center items-center">
            <span className="material-icon text-green-500">
              {formData.selectedRoom?.type_icon}
            </span>
          </div>
          {formData.selectedRoom?.name}
        </div>
        <i className="text-lg">arrow_drop_down</i>
      </button>

      {foundRoom && (
        <div className={`flex ${roomListOpen ? '' : 'h-0 overflow-hidden'}`}>
          <div className="flex bg-white hover:bg-slate-200">
            <button
              className="flex items-center gap-2 p-2 rounded-sm w-full"
              onClick={() => {
                handleSelectOption(foundRoom);
                setRoomListOpen(false);
              }}
            >
              <div className="flex justify-between">
                <div className="w-8 h-8 rounded-full flex justify-center items-center">
                  <span className="material-icon text-green-500">
                    {foundRoom.type_icon}
                  </span>
                </div>
                <p> {foundRoom.name}</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {rooms &&
        rooms
          .filter((room: Room) => room.id !== formData.selectedRoomId)
          .map((room: Room, index: number) => (
            <div
              key={index}
              className={`${roomListOpen ? '' : 'h-0 overflow-hidden'}`}
            >
              <div className="flex bg-white hover:bg-slate-200 justify-around">
                <button
                  className="flex items-center gap-2 p-2 rounded-sm w-full text-sm"
                  onClick={() => {
                    handleSelectOption(room);
                    setRoomListOpen(false);
                  }}
                >
                  <div className="w-8 h-8 rounded-full flex justify-center items-center">
                    <span className="material-icon text-green-500">
                      {room.type_icon}
                    </span>
                  </div>
                  {room.name}
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default SelectObject;
