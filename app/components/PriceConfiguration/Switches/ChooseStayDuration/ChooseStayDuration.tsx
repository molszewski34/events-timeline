import React, { useState, useEffect, ChangeEvent } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';

const ChooseStayDuration: React.FC = () => {
  const { stayDuration, shortStay, setShortStay, longStay, setLongStay } =
    usePriceConfigurationContext();

  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (
      longStay !== '' &&
      shortStay !== '' &&
      Number(longStay) < Number(shortStay)
    ) {
      setError(
        'Liczba dni krótkiego pobytu nie może być dłuższa niż liczba dni długiego pobytu'
      );
    } else {
      setError('');
    }
  }, [longStay, shortStay]);

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
              <label className="text-sm" htmlFor="longStay">
                Od ilu dni trwa krótki pobyt
              </label>
              <input
                id="shortStay"
                className="flex border border-gray-200 p-1 text-sm rounded-sm"
                type="text"
                value={shortStay}
                onChange={(e) => handleInputChange(e, setShortStay)}
              />
            </div>
            <div className="flex flex-col gap-2 text-gray-700">
              <label className="text-sm" htmlFor="shortStay">
                Od ilu dni trwa długi pobyt
              </label>
              <input
                id="shortStay"
                className="flex border border-gray-200 p-1 text-sm rounded-sm"
                type="text"
                value={longStay}
                onChange={(e) => handleInputChange(e, setLongStay)}
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
