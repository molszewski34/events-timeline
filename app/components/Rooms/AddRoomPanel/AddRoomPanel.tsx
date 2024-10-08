'use client';

import React from 'react';
import Header from './Form/Header/Header';
import Form from './Form/Form';
import Footer from './Footer/Footer';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import ClickOutside from '../../utils/ClickOutside';

const AddRoomPanel = () => {
  const { openAddRoom } = useAddRoomContext();
  return (
    <main
      style={{ display: openAddRoom ? 'flex' : 'none' }}
      className="fixed w-[92vw] max-w-[80em]  justify-self-center top-[12.5vh] right-[4vw] left-[4vw]  bg-white z-[999] p-[1.27em] flex flex-col gap-4"
    >
      <div className="relative flex flex-col gap-2">
        <Header />
        <Form />
        <Footer />
      </div>
      <ClickOutside />
    </main>
  );
};

export default AddRoomPanel;
