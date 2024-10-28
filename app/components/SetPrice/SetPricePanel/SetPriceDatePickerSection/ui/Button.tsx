import React from 'react';
import useHandleAddDatePicker from '../hooks/useHandleAddDatePicker';

const Button = () => {
  const { handleAddDatePicker } = useHandleAddDatePicker();

  return (
    <button
      type="button"
      onClick={handleAddDatePicker}
      className="flex items-center gap-1 text-[#00a541] text-xs text-left rounded font-medium cursor-pointer w-fit"
    >
      <i className="text-xl">add</i>
      <p className="text-xs">Dodaj kolejny termin</p>
    </button>
  );
};

export default Button;
