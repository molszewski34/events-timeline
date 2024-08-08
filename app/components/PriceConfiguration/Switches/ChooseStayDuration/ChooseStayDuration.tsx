import React, { useState, useEffect, ChangeEvent } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';

const ChooseStayDuration: React.FC = () => {
  const {
    stayDuration,
    shortStayMax,
    setShortStayMax,
    shortStayMin,
    setShortStayMin,
  } = usePriceConfigurationContext();

  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (
      shortStayMax !== '' &&
      shortStayMin !== '' &&
      Number(shortStayMax) > Number(shortStayMin)
    ) {
      setError(
        'Liczba dni krótkiego pobytu nie może być dłuższa niż liczba dni długiego pobytu'
      );
    } else {
      setError('');
    }
  }, [shortStayMax, shortStayMin]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setValue(value);
    }
  };

  return (
    <>
      {stayDuration && (
        <div className="flex flex-col">
          <div
            className={`flex flex-col gap-2 py-3 px-2 border ${
              error ? 'border-red-500' : 'border-gray-200'
            } mt-2 rounded-sm`}
          >
            <div className="flex flex-col gap-2 text-gray-700">
              <label className="text-sm" htmlFor="shortStayMax">
                Do ilu dni trwa krótki pobyt
              </label>
              <input
                id="shortStayMax"
                className="flex border border-gray-200 p-1 text-sm rounded-sm"
                type="text"
                value={shortStayMax}
                onChange={(e) => handleInputChange(e, setShortStayMax)}
              />
            </div>
            <div className="flex flex-col gap-2 text-gray-700">
              <label className="text-sm" htmlFor="shortStayMin">
                Od ilu dni trwa krótki pobyt
              </label>
              <input
                id="shortStayMin"
                className="flex border border-gray-200 p-1 text-sm rounded-sm"
                type="text"
                value={shortStayMin}
                onChange={(e) => handleInputChange(e, setShortStayMin)}
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      )}
    </>
  );
};

export default ChooseStayDuration;
