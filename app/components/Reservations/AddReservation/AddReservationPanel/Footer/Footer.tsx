import React, { useContext, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import AddReservationSubmitBtn from '../../AddReservationSubmitBtn/AddReservationSubmitBtn';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import UpdateReservationButton from '../../UpdateReservationButton/UpdateReservationButton';

const Footer: React.FC = () => {
  const { isEditing } = useCalendarContext();
  return (
    <div className="flex items-center">
      <button className="flex gap-1 bg-gray-300   w-full items-center justify-center py-1 rounded-sm ">
        Zamknij
      </button>
      {isEditing ? <UpdateReservationButton /> : <AddReservationSubmitBtn />}
    </div>
  );
};

export default Footer;
