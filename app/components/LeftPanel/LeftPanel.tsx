import React from 'react';
// import { rooms } from '@/app/data/roomsData';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';

const LeftPanel = ({ id }: { id: string }) => {
  const { fetchedRooms, setFetchedRooms } = useAddRoomContext();
  const supabase = useSupabaseBrowser();
  // const { data: reservations } = useQuery(fetchReservations(supabase, id));
  const { data: rooms } = useQuery(fetchRooms(supabase, id));
  return (
    <div className="fixed   bg-white z-[50] min-w-[100px] flex flex-col">
      <div className="h-[50px] text-xs text-left p-2 border-2 border-l-0 text-gray-500">
        <i className="material-icons text-2xl">filter_alt</i>
      </div>
      {rooms?.map((room: any) => (
        <button className="h-[50px] text-xs text-left p-2 shadow-sm border-r-2 gap-1">
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
