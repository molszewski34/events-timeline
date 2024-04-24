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
      <Label title="Rejestracja" />

      <select
        className="p-2 bg-white border border-gray-300 rounded-sm text-gray-500"
        value={formData.registration}
        onChange={handleCountryChange}
      >
        <option>OV - bez wyżywienia</option>
        <option>BB - śniadanie</option>
        <option>HB - śniadanie, obiadokolacja </option>
        <option>FB - śniadanie, obiad, kolacja </option>
      </select>
    </div>
  );
};

export default Boarding;
