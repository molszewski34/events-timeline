import React, { ChangeEvent } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { FormData } from '@/app/contexts/AddReservation/types';

interface FieldProps {
  placeholder: string;
  formDataKey: keyof FormData; // Define the type for formDataKey
  label: string;
}

const Field: React.FC<FieldProps> = ({ label, placeholder, formDataKey }) => {
  const { formData, setFormData } = useAddReservationContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData((prevData: FormData) => ({
      ...prevData,
      [formDataKey]: value,
    }));
  };

  return (
    <main className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-400 w-full text-sm">
          {label}
        </label>

        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm ">
          <input
            className="w-full pl-2 py-2 text-sm text-gray-600"
            type="text"
            onChange={handleChange}
            placeholder={placeholder}
          />
        </form>
      </div>
    </main>
  );
};

export default Field;
