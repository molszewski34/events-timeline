import React, { FC } from 'react';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header className="border-b-2 border-gray-200 pb-2 font-semibold text-gray-400">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
