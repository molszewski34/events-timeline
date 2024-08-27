'use client';
import React, { useState } from 'react';
import SidebarHeader from './Header/SidebarHeader';
import './styles.css';
import { useSidebarContext } from '@/app/contexts/Sidebar/SidebarProvider';
import DropdownMenu from './DropdownMenu/DropdownMenu';

const Sidebar = ({ data }) => {
  const { openSidebar, setOpenSidebar } = useSidebarContext();

  const reservations = [
    { href: '/calendar', text: 'Kalendarz' },
    { href: '/booking', text: 'Lista rezerwacji' },
    { href: '/clients', text: 'Klienci' },
  ];
  const prices = [
    {
      href: data.isReminding ? '/price/set' : '/price/configuration',
      text: 'Ustaw ceny',
    },
    { href: '/price/configuration', text: 'Konfiguracja' },
    { href: '/price/additional', text: 'Usługi dodatkowe' },
  ];

  console.log(data);

  return (
    <>
      {openSidebar && (
        <main
          className={`fixed top-0 bottom-0 left-0 z-[100] shadow-md bg-white transition-transform transform  ${
            openSidebar ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ width: '250px' }}
        >
          <SidebarHeader />
          <DropdownMenu
            links={reservations}
            name={'Rezerwacje'}
            icon={'calendar_today'}
          />
          <DropdownMenu links={prices} name={'Cennik'} icon={'attach_money'} />
        </main>
      )}
    </>
  );
};

export default Sidebar;
