import React from 'react';

interface SubmitButtonProps {
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  icon?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  onClick,
  isDisabled = false,
  icon,
}) => {
  return (
    <button
      className={`flex gap-1 text-center text-white text-sm font-bold bg-green-600 hover:bg-green-700  rounded-sm justify-center items-center w-full h-8 ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <i className="">{icon}</i>
      {text}
    </button>
  );
};

export default SubmitButton;
