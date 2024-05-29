import React from 'react';
import Label from '../../../Headers/Label';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

const Boarding = () => {
  const { formData, setFormData } = useAddReservationContext();

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      registration: e.target.value,
    }));
  };
  return (
    <div className="flex flex-col gap-2">
      <Label title="Wyżywienie" />

      <select
        className="p-2 bg-white border border-gray-300 rounded-sm text-gray-500 text-xs"
        value={formData.registration}
        onChange={handleCountryChange}
      >
        <option className="text-base">OV - bez wyżywienia</option>
        <option className="text-base">BB - śniadanie</option>
        <option className="text-base">HB - śniadanie, obiadokolacja </option>
        <option className="text-base">FB - śniadanie, obiad, kolacja </option>
      </select>
    </div>
  );
};

export default Boarding;
