import React from 'react';
import Label from '../../Headers/Label';
import Field from '../Field/Field';
import { rooms } from '@/app/data/roomsData';
import SelectRoomType from '../../SelectRoomType/SelectRoomtype';
import RoomDetails from './RoomDetails/RoomDetails';
import RoomExtras from './RoomExtras/RoomExtras';
const BasicInformations = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {/* <Label title="Nazwa pokoju" /> */}
        <Field
          formDataKey="roomName"
          type="text"
          label="Nazwa pokoju"
          placeholder={`Pokój ${rooms.length}`}
          value={`Pokój ${rooms.length}`}
        />
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
