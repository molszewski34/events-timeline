'use client';
import React, { useState } from 'react';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { createRoom } from '@/app/actions/createRoom';

const AddRoomSubmitBtn = () => {
  const { roomFormData } = useAddRoomContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const result = await createRoom(roomFormData);
    if (result.success) {
      alert('Room added successfully!');
    } else {
      alert('Error adding room: ' + result.error);
    }

    setIsSubmitting(false);
  };

  return (
    <button
      type="button"
      className="flex gap-1 bg-green-600  text-white w-full items-center justify-center py-1 rounded-sm"
      onClick={handleSubmit}
      disabled={isSubmitting}
    >
      <span className="material-icon">save</span>
      Zapisz
    </button>
  );
};

export default AddRoomSubmitBtn;
