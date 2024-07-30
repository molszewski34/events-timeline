import React, { useState } from 'react';

const ToggleSwitchComponent = ({ question }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex items-center gap-2">
      <h1 className={isToggled ? 'text-green-500' : ''}>{question}</h1>
      <label className="relative inline-block w-8 h-5">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={isToggled}
          onChange={handleToggle}
        />
        <span
          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all ${
            isToggled ? 'bg-green-500' : ''
          }`}
        ></span>
        <span
          className={`absolute left-[2px] bottom-[2px] bg-white w-4 h-4 rounded-full transition-transform transform ${
            isToggled ? 'translate-x-3' : ''
          }`}
        ></span>
      </label>
    </div>
  );
};

export default ToggleSwitchComponent;
