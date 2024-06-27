import React, { useEffect } from 'react';
import Label from '../../Headers/Label';
import Field from '../Field/Field';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import SelectRoomType from '../../SelectRoomType/SelectRoomtype';
import RoomDetails from './RoomDetails/RoomDetails';
import RoomExtras from './RoomExtras/RoomExtras';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { RoomFormData } from '@/app/contexts/AddRoom/types';

const BasicInformations = ({ id }: { id: string }) => {
  const { fetchedRooms, roomFormData, setRoomFormData } = useAddRoomContext();
  const supabase = useSupabaseBrowser();
  const { isEditing, setIsEditing } = useCalendarContext();

  const { data: rooms } = useQuery(fetchRooms(supabase, id));

  const roomCount = rooms?.length ?? 0;

  console.log(roomFormData.roomName);

  useEffect(() => {
    if (!isEditing)
      setRoomFormData((prevData: RoomFormData) => ({
        ...prevData,
        roomName: `Pokój ${roomCount + 1}`,
      }));
  }, [roomCount]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {isEditing ? (
          <Field
            formDataKey="roomName"
            type="text"
            label="Nazwa pokoju"
            placeholder={roomFormData.roomName}
            value={roomFormData.roomName}
          />
        ) : (
          <Field
            formDataKey="roomName"
            type="text"
            label="Nazwa pokoju"
            placeholder={`Pokój ${roomCount + 1}`}
            value={`Pokój ${roomCount + 1}`}
          />
        )}

        <Label title="Typ" />
        <SelectRoomType />
        <Label title="Opis pokoju" />
        <RoomDetails />
        <Label title="Dodatkowe wyposażenie" />
        <RoomExtras />

        <Field formDataKey="roomArea" label="Powierzchnia pokoju" />
      </div>
    </div>
  );
};

export default BasicInformations;
