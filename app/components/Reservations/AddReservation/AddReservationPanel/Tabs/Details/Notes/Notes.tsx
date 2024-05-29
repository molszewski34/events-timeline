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
        className="border border-gray-300 rounded-sm px-2 py-1 text-xs w-full"
        name="notes"
        cols={30}
        rows={3}
        value={formData.notes}
        onChange={handleNotesChange}
        style={{
          resize: 'none',
        }}
      />
    </div>
  );
};

export default Notes;
