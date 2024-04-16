import React, { FC, ChangeEvent, useState } from 'react';

interface FormProps {
  value: number;
  onChange: (value: number) => void;
}

const Form: FC<FormProps> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.trim() === '') {
      onChange(0);
    } else {
      const newValue = parseFloat(value);
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm ">
        <input
          className="w-full pl-2 py-2"
          type="text"
          value={value}
          onChange={handleChange}
        />
        <p className="text-gray-400 pr-12">PLN</p>
      </form>
    </div>
  );
};

export default Form;
