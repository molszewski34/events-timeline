'use client';
import React, { useState } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { createRoom } from '@/app/actions/createRoom';
import { addReservation } from '@/app/actions/addReservation';

const AddReservationSubmitBtn = () => {
  const { formData } = useAddReservationContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const { data, error } = await addReservation(formData);

    if (error) {
      alert('Error adding reservation: ' + error);
    } else {
      alert('Reservation added successfully!');
    }

    setIsSubmitting(false);
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
