// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { updateRoom } from '@/app/actions/updateRoom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UpdateRoomButton = () => {
  const { roomFormData, selectedReservationId } = useAddRoomContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      queryClient.invalidateQueries('rooms');
      alert('Zaktualizowano pokój');
    },
    onError: (error) => {
      alert('Błąd podczas dodawania pokoju ' + error.message);
    },
  });

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await mutation.mutateAsync(roomFormData);
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

export default UpdateRoomButton;
