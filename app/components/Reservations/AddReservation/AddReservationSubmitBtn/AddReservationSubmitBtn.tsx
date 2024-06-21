'use client';
import React, { useState } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { addReservation } from '@/app/actions/addReservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AddReservationSubmitBtn = () => {
  const { formData } = useAddReservationContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addReservation,
    onSuccess: () => {
      queryClient.invalidateQueries('reservations');
      alert('Dodano rezerwacje');
    },
    onError: (error) => {
      alert('Error adding reservation: ' + error.message);
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
      className="flex gap-1 bg-green-600 hover:bg-green-700 text-white w-full items-center justify-center py-1 rounded-sm"
      onClick={handleSubmit}
      disabled={isSubmitting}
    >
      <span className="material-icon">save</span>
      Zapisz
    </button>
  );
};

export default AddReservationSubmitBtn;
