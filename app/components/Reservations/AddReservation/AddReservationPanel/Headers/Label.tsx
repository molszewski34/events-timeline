import React, { FC } from 'react';
interface HeaderProps {
  title: string;
}

const Label: FC<HeaderProps> = ({ title }) => {
  return (
    <h2 className="font-semibold text-gray-400 w-full text-sm">{title}</h2>
  );
};

export default Label;
