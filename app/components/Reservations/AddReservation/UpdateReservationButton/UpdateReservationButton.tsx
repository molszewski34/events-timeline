// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { updateReservation } from '@/app/actions/updateReservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UpdateReservationButton = () => {
  const { formData, selectedReservationId } = useAddReservationContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateReservation,
    onSuccess: () => {
      queryClient.invalidateQueries('reservations');
      alert('Zaktualizowano rezerwacje');
    },
    onError: (error) => {
      alert('Błąd podczas dodawania rezerwacji ' + error.message);
    },
  });

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await mutation.mutateAsync(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      type="button"
      className="flex gap-1 bg-green-600 text-white w-full items-center justify-center py-1 rounded-sm"
      onClick={handleSubmit}
      disabled={isSubmitting}
    >
      <span className="material-icon">save</span>
      Zapisz
    </button>
  );
};

export default UpdateReservationButton;
