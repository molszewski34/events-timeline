import React from 'react';
// import { rooms } from '@/app/data/roomsData';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { Room } from '../RenderRows/types';

const LeftPanel = ({ id }: { id: string }) => {
  const {
    fetchedRooms,
    setFetchedRooms,
    openAddRoom,
    setOpenAddRoom,
    setRoomFormData,
  } = useAddRoomContext();
  const supabase = useSupabaseBrowser();
  const { isEditing, setIsEditing } = useCalendarContext();

  const { data: rooms } = useQuery(fetchRooms(supabase, id));

  const handleButtonClick = (room: Room) => {
    const newRoomFormData = {
      user_id: room.user_id,
      roomName: room.name,
      roomGuests: room.guests || 0,
      roomPrice: room.price || 65,
      roomType: room.type || 'Pokój',
      roomTypeIcon: room.type_icon || 'bed',
      roomDetails: room.details || '',
      roomExtras: room.extras || '',
      roomArea: room.area || '',
      roomNumOfPersons: room.num_of_persons || 2,
      roomAdditionalPersons: room.additional_persons || 0,
      roomNumOfSingleBeds: room.num_of_single_beds || 2,
      roomNumOfDoubleBeds: room.num_of_double_beds || 0,
      roomColor: room.color || '',
      roomCountry: room.country || {
        name: 'Polska',
        file_url: '//upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg',
      },
      roomAdress: room.address || '',
      roomPostCode: room.post_code || '',
      roomCity: room.city || '',
    };
    setRoomFormData(newRoomFormData);
  };
  return (
    <div className="fixed   bg-white z-[50] min-w-[100px] flex flex-col">
      <div className="h-[50px] text-xs text-left p-2 border-2 border-l-0 text-gray-500">
        <i className="material-icons text-2xl">filter_alt</i>
      </div>
      {rooms?.map((room: Room) => (
        <button
          className="h-[50px] text-xs text-left p-2 shadow-sm border-r-2 gap-1"
          onClick={() => {
            setIsEditing(true);
            setOpenAddRoom(true);
            handleButtonClick(room);
          }}
        >
          {room.name}
          <div className="flex gap-1 items-center">
            <p className="material-icon text-gray-500 text-base">
              {room.type_icon}
            </p>
            <div className="flex items-center">
              <p className="material-icon text-gray-500 text-base">person</p>
              <p>{room.num_of_persons}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default LeftPanel;
