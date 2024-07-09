'use client';
import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DropdownMenuProps {
  links: { href: string; text: string }[];
  name: string;
  icon: ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ links, name, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  return (
    <div className={`relative ${isOpen ? 'border-l-4 border-green-500' : ''}`}>
      <button
        onClick={toggleMenu}
        className={`flex px-2 py-2 text-sm w-full text-left gap-2 justify-between ${
          isOpen ? 'bg-gray-100' : ''
        }`}
      >
        <div className="flex gap-2 items-center">
          <i>{icon}</i>
          {name}
        </div>
        <i>{`${isOpen ? 'keyboard_arrow_down' : 'chevron_right'} `}</i>
      </button>
      {isOpen && (
        <div className="flex flex-col text-xs h-full w-full bg-white pl-9 ">
          {links.map((link, index) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                href={link.href}
                key={index}
                className={`py-2 ${isActive ? 'font-bold' : 'text-gray-800'}`}
              >
                {link.text}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
