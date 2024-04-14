'use client';

import React from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import Header from './Header/Header';
import TabsComponent from './Tabs/TabsComponent';

const AddReservationPanel = () => {
  const { openAddReservationPanel, setOpenAddReservationPanel } =
    useAddReservationContext();
  return (
    <main className="absolute top-0 bottom-0 right-0 left-0 bg-white z-[999] p-2 h-screen flex flex-col gap-4 overflow-y-auto">
      <Header />
      <TabsComponent />
    </main>
  );
};

export default AddReservationPanel;
