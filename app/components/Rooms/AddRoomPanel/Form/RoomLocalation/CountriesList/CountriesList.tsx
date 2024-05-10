import React, { useState } from 'react';
// import { countries } from '@/app/data/countriesData';
import { countriesList } from '@/app/data/countriesList';
import Label from '../../../Headers/Label';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
// import { roomFormData } from '@/app/contexts/AddRoom/types';
import { CountriesListTypes } from '@/app/data/types';
const CountriesList: React.FC = () => {
  const { roomFormData, setRoomFormData } = useAddRoomContext();
  const [countriesListOpen, setCountriesListOpen] = useState(false);
  const handleCountryChange = (country: CountriesListTypes) => {
    // const value: string = e.target.value;
    setRoomFormData((prevData: FormData) => ({
      ...prevData,
      roomCountry: country,
    }));
  };

  return (
    <div className="flex flex-col gap-2 text-xs mt-2">
      <button
        className="flex items-center gap-2  px-2 rounded-sm border border-gray-200 justify-between"
        onClick={() => setCountriesListOpen(!countriesListOpen)}
      >
        <div className="flex gap-2">
          <img
            src={roomFormData.roomCountry.file_url}
            alt=""
            className="w-5 h-4"
          />

          {roomFormData.roomCountry.name}
        </div>
        <i className="text-xl">arrow_drop_down</i>
      </button>
      <div
        className={`h-[300px] overflow-y-scroll ${
          countriesListOpen ? '' : 'hidden overflow-hidden'
        }`}
      >
        {countriesList.map((country, index) => (
          <div key={index}>
            {roomFormData.selectedStatus?.name !== country.name && (
              <button
                className="flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm"
                onClick={() => {
                  handleCountryChange(country);
                  setCountriesListOpen(false);
                }}
              >
                <img src={country.file_url} alt="" className="w-5 h-4" />
                {country.name}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountriesList;
