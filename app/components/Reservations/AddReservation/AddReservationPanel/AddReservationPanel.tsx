'use client';

import React from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import Header from './Header/Header';
import TabsComponent from './Tabs/TabsComponent';

const AddReservationPanel = () => {
  const { openAddReservationPanel, setOpenAddReservationPanel } =
    useAddReservationContext();

  return (
    <main
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-[99] p-4 max-w-[92vw] h-[95vh]   flex flex-col gap-4 overflow-y-auto rounded-sm  w-full `}
      style={{ display: openAddReservationPanel ? 'flex' : 'none' }}
    >
      <Header />
      <TabsComponent />
    </main>
  );
};

export default AddReservationPanel;
