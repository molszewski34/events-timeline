import React, { useState, useEffect, ChangeEvent } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import { PriceConfiguration } from '@/app/contexts/PriceConfiguration/types';

const ChooseStayDuration: React.FC = () => {
  const { priceSettings, setPriceSettings } = usePriceConfigurationContext();

  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (
      priceSettings.longStay !== '' &&
      priceSettings.shortStay !== '' &&
      Number(priceSettings.longStay) < Number(priceSettings.shortStay)
    ) {
      setError(
        'Liczba dni krótkiego pobytu nie może być dłuższa niż liczba dni długiego pobytu'
      );
    } else {
      setError('');
    }
  }, [priceSettings.longStay, priceSettings.shortStay]);

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
      {priceSettings.stayDuration && (
        <div className="flex flex-col">
          <div
            className={`flex flex-col gap-2 py-3 px-2 border ${
              error ? 'border-red-500' : 'border-gray-200'
            } mt-2 rounded-sm`}
          >
            <div className="flex flex-col gap-2 text-gray-700">
              <label className="text-sm" htmlFor="priceSettings.shortStay">
                Do ilu dni trwa krótki pobyt
              </label>
              <input
                id="priceSettings.shortStay"
                className="flex border border-gray-200 p-1 text-sm rounded-sm"
                type="text"
                value={priceSettings.shortStay}
                onChange={(e) =>
                  handleInputChange(e, (newValue) =>
                    setPriceSettings((prevSettings: PriceConfiguration) => ({
                      ...prevSettings,
                      shortStay: newValue,
                    }))
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-2 text-gray-700">
              <label className="text-sm" htmlFor="priceSettings.longStay">
                Od ilu dni trwa długi pobyt
              </label>
              <input
                id="priceSettings.longStay"
                className="flex border border-gray-200 p-1 text-sm rounded-sm"
                type="text"
                value={priceSettings.longStay}
                onChange={(e) =>
                  handleInputChange(e, (newValue) =>
                    setPriceSettings((prevSettings: PriceConfiguration) => ({
                      ...prevSettings,
                      longStay: newValue,
                    }))
                  )
                }
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
