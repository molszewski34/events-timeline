'use client';
import React, { useState } from 'react';
import SidebarHeader from './Header/SidebarHeader';
import './styles.css';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-[1000]"
      ></button>
      <main
        className={`fixed top-0 bottom-0 left-0 z-[100] shadow-md bg-white transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '250px' }}
      >
        <SidebarHeader />
      </main>
    </>
  );
};

export default Sidebar;
