import React from 'react';
import { usePathname } from 'next/navigation';
import AddReservationBtn from '../../Reservations/AddReservation/Button/AddReservationBtn';
import SetPriceBtn from '../../SetPrice/SetPriceBtn/SetPriceBtn';
const MemoizedButton = React.memo(({ room, currentDateTimestamp, onClick }) => {
  const pathname = usePathname();

  if (pathname === '/calendar') {
    return (
      <AddReservationBtn
        room={room}
        timestamp={currentDateTimestamp}
        onClick={onClick}
      />
    );
  } else {
    return (
      <SetPriceBtn
        room={room}
        timestamp={currentDateTimestamp}
        onClick={onClick}
      />
    );
  }
});

export default MemoizedButton;
