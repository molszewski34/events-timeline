import React from 'react';
import Label from '../../../Headers/Label';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

const Registration = () => {
  const { formData, setFormData } = useAddReservationContext();

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      registration: e.target.value,
    }));
  };
  return (
    <div className="flex flex-col gap-2">
      <Label title="Meldunek" />

      <select
        className="p-2 bg-white border border-gray-300 rounded-sm text-gray-500 text-xs"
        value={formData.registration}
        onChange={handleCountryChange}
      >
        <option className="text-base">Wybierz</option>
        <option className="text-base">Zameldowanie</option>
        <option className="text-base">Wymeldowanie</option>
      </select>
    </div>
  );
};

export default Registration;
