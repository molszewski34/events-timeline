import React, { useState } from 'react';
import { RoomType } from './roomTypeData';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { roomTypes } from './roomTypeData';

const SelectRoomType = () => {
  const { roomFormData, setRoomFormData, roomListOpen, setRoomListOpen } =
    useAddRoomContext();
  const [selectedType, setSelectedType] = useState<RoomType | string>(
    'Wybierz'
  );

  const handleSelectOption = ({ roomType, roomTypeIcon }: RoomType) => {
    setRoomFormData((prevData: any) => ({
      ...prevData,
      roomType: roomType,
      roomTypeIcon: roomTypeIcon,
    }));
    setSelectedType(roomType);
  };

  const filteredRoomTypes = roomTypes.filter(
    (type) => type.roomType !== roomFormData.roomType
  );

  return (
    <div className="flex flex-col">
      <button
        className={`${
          roomFormData.roomTypeIcon ? '' : 'pl-2'
        } flex items-center rounded-sm border border-gray-300 text-xs justify-between w-full px-1`}
        onClick={() => setRoomListOpen(!roomListOpen)}
      >
        <div className="flex items-center ">
          {roomFormData.roomTypeIcon ? (
            <div
              className={`w-8 h-8 rounded-full flex justify-center items-center`}
            >
              <span className={` material-icon text-green-500 text-2xl`}>
                {roomFormData.roomTypeIcon}
              </span>
            </div>
          ) : null}
          {roomFormData.roomType || 'Wybierz'}
        </div>
        <i className="text-lg">arrow_drop_down</i>
      </button>
      <div className="border border-gray-200 mt-2 rounded-sm">
        {filteredRoomTypes.map((roomType, index) => (
          <div>
            <div className={`${roomListOpen ? '' : 'hidden overflow-hidden'}`}>
              <div className="flex bg-white hover:bg-gray-200 py-1 ">
                <button
                  className="flex items-center gap-2 p-1 rounded-sm w-full"
                  onClick={() => {
                    handleSelectOption(roomType);
                    setRoomListOpen(false);
                  }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex justify-center items-center`}
                  >
                    <span className="material-icon text-xl text-green-500">
                      {roomType.roomTypeIcon}
                    </span>
                  </div>
                  {roomType.roomType}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectRoomType;
