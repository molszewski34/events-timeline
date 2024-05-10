import React, { ChangeEvent, useState } from 'react';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { RoomFormData } from '@/app/contexts/AddRoom/types';

interface FieldProps {
  placeholder?: string;
  formDataKey: keyof RoomFormData;
  value?: string;
  label: string;
  type?: 'text' | 'number';
  validateNumber?: boolean;
}

const Field: React.FC<FieldProps> = ({
  label,
  placeholder,
  formDataKey,
  type,
  value,
}) => {
  const { setRoomFormData } = useAddRoomContext();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;

    if (value.length > 20) {
      setError(`Pole ${label} nie może przekraczać 20 znaków.`);
    } else if (value.length < 1) {
      setError(`Nazwa nie może być pusta`);
      return;
    } else {
      setError(null);
      setRoomFormData((prevData: RoomFormData) => ({
        ...prevData,
        [formDataKey]: value,
      }));
    }
  };

  return (
    <main className="flex flex-col gap-2 w-full">
      <div className="flex flex-col">
        <label className=" text-gray-600 w-full text-sm my-1">{label}</label>

        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm ">
          <input
            className="w-full pl-2 py-2 text-sm text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type={type}
            onChange={handleChange}
            placeholder={placeholder}
            defaultValue={value}
          />
        </form>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </main>
  );
};

export default Field;
