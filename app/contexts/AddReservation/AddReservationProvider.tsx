'use client';

import { createContext, useContext, useState } from 'react';

const AddReservation = createContext<any>(undefined);
export function AddReservationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openAddReservationPanel, setOpenAddReservationPanel] = useState(false);

  return (
    <AddReservation.Provider
      value={{
        openAddReservationPanel,
        setOpenAddReservationPanel,
      }}
    >
      {children}
    </AddReservation.Provider>
  );
}

export function useAddReservationContext() {
  return useContext(AddReservation);
}
