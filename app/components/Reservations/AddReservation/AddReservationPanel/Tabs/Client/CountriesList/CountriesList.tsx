import React, { useState } from 'react';
import { countries } from '@/app/data/countriesData';
import Label from '../../../Headers/Label';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { FormData } from '@/app/contexts/AddReservation/types';
interface FieldProps {
  formDataKey: keyof FormData;
}

const CountriesList: React.FC<FieldProps> = ({ formDataKey }) => {
  const { formData, setFormData } = useAddReservationContext();

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = e.target.value;
    setFormData((prevData: FormData) => ({
      ...prevData,
      [formDataKey]: value,
    }));
  };

  return (
    <main className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label title="Kraj/Region" />

        <select
          className="p-2 bg-white border border-gray-300 rounded-sm text-gray-500 text-sm py-3"
          value={formData.country}
          onChange={handleCountryChange}
        >
          <option>Wybierz</option>
          {countries.map((country) => (
            <option>{country.name_pl}</option>
          ))}
        </select>
      </div>
    </main>
  );
};

export default CountriesList;
