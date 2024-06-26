// @ts-nocheck
'use client';
import React from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReservation } from '@/app/actions/deleteReservation';
const DeleteConfirmation = () => {
  const { isDeleting, setIsDeleting, setOverlayDelete, setOverlay } =
    useCalendarContext();
  const { formData, setOpenAddReservationPanel } = useAddReservationContext();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries('reservations');
      alert('Usunięto rezerwacje');
    },
    onError: (error) => {
      alert('Błąd podczas usuwania rezerwacji ' + error.message);
    },
  });

  const handleSubmit = async () => {
    try {
      await mutation.mutateAsync(formData);
    } finally {
      setIsDeleting(false);
      setOverlayDelete(false);
      setOpenAddReservationPanel(false);
      setOverlay(false);
    }
  };
  return (
    <div>
      {isDeleting && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-[999] p-6 min-w-[10em] max-w-[30em] flex flex-col overflow-y-auto gap-2`}
        >
          <h1 className="text-gray-700 font-semibold">Proszę potwierdzić</h1>
          <p className="text-[#E49F9F]">Czy chcesz usunąć rezerwację?</p>
          <div className="flex justify-around">
            <button
              className="border border-gray-700 px-3 py-1 rounded-sm"
              onClick={() => {
                setIsDeleting(false);
                setOverlayDelete(false);
              }}
            >
              Anuluj
            </button>
            <button
              className="px-3 py-1 rounded-sm bg-red-500 text-white font-semibold"
              onClick={handleSubmit}
            >
              Skasuj
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteConfirmation;
