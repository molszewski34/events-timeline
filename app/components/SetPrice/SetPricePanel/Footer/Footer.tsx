import React from 'react';

import SubmitButton from '@/app/components/utils/SubmitButton';

const Footer: React.FC = () => {
  return (
    <div className="flex items-center justify-around">
      <button className="flex gap-1 bg-gray-300 text-sm font-semibold  w-full items-center justify-center  rounded-sm h-8">
        Zamknij
      </button>
      <SubmitButton text="Zapisz" icon="save" />
    </div>
  );
};

export default Footer;
