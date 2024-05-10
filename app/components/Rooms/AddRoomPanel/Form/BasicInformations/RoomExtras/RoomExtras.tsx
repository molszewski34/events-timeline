import React, { useState, ChangeEvent } from 'react';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';

const RoomExtras: React.FC = () => {
  const { setRoomFormData } = useAddRoomContext();

  const [countSymbols, setCountSymbols] = useState<string>('');
  const maxCharacters: number = 500;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const inputText: string = event.target.value;
    setCountSymbols(inputText);
    setRoomFormData((prevData: any) => ({
      ...prevData,
      roomExtras: countSymbols,
    }));
  };

  return (
    <div className="flex flex-col">
      <textarea
        className="resize-none border rounded-md w-full px-3 py-2 text-xs"
        rows={4}
        maxLength={maxCharacters}
        value={countSymbols}
        onChange={handleChange}
      />
      <span className="text-right text-xs mt-1">
        {countSymbols.length}/{maxCharacters}
      </span>
    </div>
  );
};

export default RoomExtras;
