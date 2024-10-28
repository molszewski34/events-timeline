import React, { useState } from 'react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';
import useSetPriceFormData from './hooks/useSetPriceFormData';
import Modal from './Modal';
import AddNextRoomBtn from './AddNextRoomBtn';
import Overlay from './Overlay';

const RoomSelector = ({ id }: { id: string }) => {
  const supabase = useSupabaseBrowser();

  const { data: rooms } = useQuery(fetchRooms(supabase, id));
  const [isNextRoomVisible, setIsNextRoomVisible] = useState(false);
  useSetPriceFormData();

  return (
    <div className="relative flex flex-col gap-2">
      <Overlay
        isNextRoomVisible={isNextRoomVisible}
        setIsNextRoomVisible={setIsNextRoomVisible}
      />
      <div className="relative">
        <header className="border-b-2 border-gray-200 pb-2 font-semibold text-gray-400 text-[13px]">
          <h1 className="text-gray-500">Wybierz pokoje:</h1>
        </header>
        <Modal rooms={rooms} isNextRoomVisible={isNextRoomVisible} />
        <AddNextRoomBtn setIsNextRoomVisible={setIsNextRoomVisible} />
      </div>
    </div>
  );
};

export default RoomSelector;
