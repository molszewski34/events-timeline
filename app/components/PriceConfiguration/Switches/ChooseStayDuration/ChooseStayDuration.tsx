import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import React from 'react';

const ChooseStayDuration = () => {
  const { stayDuration } = usePriceConfigurationContext();
  return (
    <>
      {stayDuration && (
        <div className="flex flex-col gap-2 py-3 px-2 border border-gray-200 mt-2 rounded-sm">
          <div className="flex flex-col gap-2 text-gray-700">
            <label className="text-sm" htmlFor="">
              Do ilu dni trwa krótki pobyt
            </label>{' '}
            <input
              className="flex border border-gray-200 p-1 text-sm rounded-sm"
              type="text"
              defaultValue={0}
            />
          </div>
          <div className="flex flex-col gap-2 text-gray-700">
            <label className="text-sm" htmlFor="">
              Od ilu dni trwa krótki pobyt
            </label>{' '}
            <input
              className="flex border border-gray-200 p-1 text-sm rounded-sm"
              type="text"
              defaultValue={0}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChooseStayDuration;
