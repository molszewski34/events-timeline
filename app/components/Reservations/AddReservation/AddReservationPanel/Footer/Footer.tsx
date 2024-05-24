import React, { useContext, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import AddReservationSubmitBtn from '../../AddReservationSubmitBtn/AddReservationSubmitBtn';

const Footer: React.FC = () => {
  return (
    <div className="flex items-center">
      <Button
        size={'sm'}
        className="flex gap-1 bg-gray-200 text-black w-full"
        variant="outline"
      >
        Zamknij
      </Button>
      <AddReservationSubmitBtn />
    </div>
  );
};

export default Footer;
