import React, { useState } from 'react';
import SectionHeader from '../../../../utils/SectionHeader';
import { roomColors } from './colorsList';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';

import './styles.css';

const RoomColor = () => {
  const [expandGuestField, setExpandGuestField] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { roomFormData, setRoomFormData } = useAddRoomContext();

  const handleSelectedColor = (roomColor: string) => {
    setRoomFormData((prevData: any) => ({
      ...prevData,
      roomColor: roomColor,
    }));
  };

  // Provide a default background color when selectedColor is null
  const backgroundColorStyle = selectedColor
    ? { backgroundColor: selectedColor }
    : {};

  return (
    <main className="flex flex-col gap-2 mt-2">
      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          {/* <SectionHeader title="Oznacz pokój kolorem" /> */}
          <header className="font-semibold text-gray-400 w-full">
            <h1 className="text-gray-500">Oznacz pokój kolorem</h1>
          </header>
          <div
            className={`rounded-full flex items-center justify-center w-9 h-7 ${
              selectedColor === '#ffffff' ? 'border border-gray-300' : ''
            }`}
            style={backgroundColorStyle}
          ></div>
          <button
            className={`material-icons  bg-gray-300 rounded-sm mt-1 ${
              expandGuestField ? 'rotate-180' : ''
            }`}
            onClick={() => setExpandGuestField(!expandGuestField)}
          >
            expand_more
          </button>
        </div>
        <section
          className={`overflow-hidden ${expandGuestField ? 'h-full' : 'h-0'}`}
        >
          <div className="grid grid-template items-center">
            {roomColors.map((roomColor) => (
              <div
                key={roomColor}
                className={` rounded-full m-2 flex items-center justify-center ${
                  roomColor === '#ffffff' ? 'border border-gray-300' : ''
                } ${selectedColor === roomColor ? 'w-11 h-11' : 'w-9 h-9'}`}
                style={{ backgroundColor: roomColor }}
                onClick={() => {
                  setSelectedColor(roomColor);
                  handleSelectedColor(roomColor);
                }}
              >
                {selectedColor === roomColor && (
                  <i
                    className={`text-lg ${
                      roomColor === '#ffffff' ? 'text-black' : 'text-white'
                    }`}
                  >
                    done
                  </i>
                )}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default RoomColor;
