import React, { ChangeEvent, useState } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { FormData } from '@/app/contexts/AddReservation/types';

interface FieldProps {
  placeholder: string;
  formDataKey: keyof FormData;
  label: string;
  type: 'text' | 'number';
  validateNumber?: boolean;
}

const Field: React.FC<FieldProps> = ({
  label,
  placeholder,
  formDataKey,
  type,
}) => {
  const { formData, setFormData } = useAddReservationContext();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;

    if (formDataKey === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setError('Niepoprawny wzór adresu email');
        return;
      } else {
        setError(null);
      }
    } else if (
      (formDataKey === 'houseNumber' ||
        formDataKey === 'apartmentNumber' ||
        formDataKey === 'phone') &&
      value.trim() !== '' &&
      !/^\d+$/.test(value)
    ) {
      setError(`Pole "${label}" może zawierać tylko cyfry.`);
      return;
    } else if (value.length > 20) {
      setError(`Pole ${label} nie może przekraczać 20 znaków.`);
      return;
    } else {
      setError(null);
    }

    setFormData((prevData: FormData) => ({
      ...prevData,
      [formDataKey]: value,
    }));
  };

  return (
    <main className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-400 w-full text-sm">
          {label}
        </label>

        <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm ">
          <input
            className="w-full pl-2 py-2 text-sm text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type={type}
            onChange={handleChange}
            placeholder={placeholder}
          />
        </form>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </main>
  );
};

export default Field;
