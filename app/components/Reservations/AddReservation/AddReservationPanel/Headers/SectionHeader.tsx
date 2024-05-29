import React, { FC } from 'react';

interface HeaderProps {
  title: string;
}

const SectionHeader: FC<HeaderProps> = ({ title }) => {
  return (
    <header className="border-b-2 border-gray-200 pb-2 font-semibold text-gray-400 text-sm">
      <h1 className="text-gray-500">{title}</h1>
    </header>
  );
};

export default SectionHeader;
