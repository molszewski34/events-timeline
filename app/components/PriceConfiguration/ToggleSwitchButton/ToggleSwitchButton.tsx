import React, { useState } from 'react';

interface ToggleSwitchComponentProps {
  question: string;
  onToggle: (toggled: boolean) => void;
  checked: boolean;
}

const ToggleSwitchComponent: React.FC<ToggleSwitchComponentProps> = ({
  question,
  onToggle,
}) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    const newToggledState = !isToggled;
    setIsToggled(newToggledState);
    onToggle(newToggledState);
  };

  return (
    <div className="flex flex-col gap-2 text-sm text-gray-600">
      <h1 className={isToggled ? 'text-green-600' : ''}>{question}</h1>
      <div className="flex gap-2">
        <label className="relative inline-block w-8 h-5">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0"
            checked={isToggled}
            onChange={handleToggle}
          />
          <span
            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all ${
              isToggled ? 'bg-green-600' : ''
            }`}
          ></span>
          <span
            className={`absolute left-[2px] bottom-[2px] bg-white w-4 h-4 rounded-full transition-transform transform ${
              isToggled ? 'translate-x-3' : ''
            }`}
          ></span>
        </label>
        <p className="text-gray-600">TAK</p>
      </div>
    </div>
  );
};

export default ToggleSwitchComponent;
