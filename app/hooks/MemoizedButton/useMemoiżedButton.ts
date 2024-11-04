import React from 'react';
import { usePathname } from 'next/navigation';
import AddReservationBtn from '@/app/components/Reservations/AddReservation/Button/AddReservationBtn';
import SetPriceBtn from '@/app/components/SetPrice/SetPriceBtn/SetPriceBtn';

function useMemoizedButton() {
  const pathname = usePathname();

  return React.memo(pathname === '/calendar' ? AddReservationBtn : SetPriceBtn);
}

export default useMemoizedButton;
