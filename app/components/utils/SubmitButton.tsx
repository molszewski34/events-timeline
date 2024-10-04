import React from 'react';

interface SubmitButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  onClick,
  disabled = false,
  icon,
}) => {
  return (
    <button
      className={`flex gap-1 text-center text-white text-sm font-bold bg-green-600 hover:bg-green-700 rounded-sm justify-center items-center w-full h-8 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <i className="">{icon}</i>
      {text}
    </button>
  );
};

export default SubmitButton;
