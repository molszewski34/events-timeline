import React from 'react';

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => (
  <header className="flex justify-between bg-gray-100 p-2 w-full">
    <p className="text-sm">Podgląd</p>
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center justify-center material-icon text-2xl bg-gray-300 w-5 h-5 rounded-sm"
    >
      {isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
    </button>
  </header>
);

export default Header;
