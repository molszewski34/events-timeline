'use client';

import { createContext, useContext, useState } from 'react';

const AddReservation = createContext<any>(undefined);
export function AddReservationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openAddReservationPanel, setOpenAddReservationPanel] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [daysBetween, setDaysBetween] = useState(0);

  console.log(selectedStartDate);

  return (
    <AddReservation.Provider
      value={{
        openAddReservationPanel,
        setOpenAddReservationPanel,
        selectedStartDate,
        setSelectedStartDate,
        selectedEndDate,
        setSelectedEndDate,
        daysBetween,
        setDaysBetween,
      }}
    >
      {children}
    </AddReservation.Provider>
  );
}

export function useAddReservationContext() {
  return useContext(AddReservation);
}
