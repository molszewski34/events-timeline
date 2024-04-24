import React, { useState, ChangeEvent } from 'react';

import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
const Notes = () => {
  const { formData, setFormData } = useAddReservationContext();
  const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      notes: event.target.value,
    }));
  };
  return (
    <div>
      <textarea
        className="border border-gray-300"
        name="notes"
        cols={30}
        rows={5}
        value={formData.notes}
        onChange={handleNotesChange}
      />
    </div>
  );
};

export default Notes;
