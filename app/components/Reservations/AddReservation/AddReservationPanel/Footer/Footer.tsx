import React, { useContext, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import AddReservationSubmitBtn from '../../AddReservationSubmitBtn/AddReservationSubmitBtn';

const Footer: React.FC = () => {
  return (
    <div className="flex items-center">
      <button className="flex gap-1 bg-gray-300   w-full items-center justify-center py-1 rounded-sm ">
        Zamknij
      </button>
      <AddReservationSubmitBtn />
    </div>
  );
};

export default Footer;
