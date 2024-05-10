import React, { FC } from 'react';
interface HeaderProps {
  title: string;
}

const Label: FC<HeaderProps> = ({ title }) => {
  return <h2 className=" text-gray-600 w-full text-sm my-2">{title}</h2>;
};

export default Label;
