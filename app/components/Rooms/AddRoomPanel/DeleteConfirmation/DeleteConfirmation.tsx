// @ts-nocheck

'use client';
import React, { useEffect, useState } from 'react';
import { useCalendarContext } from '@/app/contexts/Calendar/CalendarProvider';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRoom } from '@/app/actions/deleteRoom';
import { useAddRoomContext } from '@/app/contexts/AddRoom/AddRoomProvider';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { fetchRooms } from '@/app/actions/fetchRoom';
import { fetchReservations } from '@/app/actions/fetchReservations';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { Database } from '@/types/supabase';

const DeleteRoomConfirmation = ({ id }: { id: string }) => {
  const {
    isDeletingRoom,
    setIsDeletingRoom,
    setOverlayDelete,
    setOverlay,
    setClickOutside,
  } = useCalendarContext();
  const { roomFormData, setOpenAddRoom } = useAddRoomContext();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries('rooms');
    },
    onError: (error) => {
      alert('Błąd podczas usuwania pokoju ' + error.message);
    },
  });

  const handleSubmit = async () => {
    try {
      await mutation.mutateAsync(roomFormData);
    } finally {
      setIsDeletingRoom(false);
      setOverlayDelete(false);
      setOpenAddRoom(false);
      setOverlay(false);
      setClickOutside(false);
    }
  };

  const supabase = useSupabaseBrowser();
  const { data: rooms } = useQuery(fetchRooms(supabase, id));
  const { data: reservations } = useQuery(fetchReservations(supabase, id));
  type Reservation = Database['public']['Tables']['reservations']['Row'];

  const [numberOfReservations, setNumberOfReservations] = useState(0);

  useEffect(() => {
    if (rooms && reservations) {
      const roomReservations = reservations.filter(
        (reservation: Reservation) =>
          reservation.room_id === roomFormData.selectedRoomId
      );
      setNumberOfReservations(roomReservations.length);
    }
  }, [rooms, reservations, roomFormData.selectedRoomId]);

  console.log(numberOfReservations);
  console.log(roomFormData.selectedRoomId);
  return (
    <div>
      {isDeletingRoom && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-[999] p-6 min-w-[10em] max-w-[30em] flex flex-col overflow-y-auto gap-2`}
        >
          <h1 className="text-gray-700 font-semibold">
            Czy chcesz usunąć wybrany pokój?
          </h1>
          <ul className="text-[#E49F9F] list-disc pl-8">
            {numberOfReservations < 1 ? (
              <li className="">
                Pokój nie posiada żadnej rezerwacji. Możesz go bezpiecznie
                usunąć
              </li>
            ) : (
              <li className="">
                {` Usunięcie pokoju spowoduje skasowanie ${numberOfReservations}
              rezerwacji ${
                numberOfReservations <= 1 ? 'przypisanej' : 'przypisanych'
              } do pokoju`}
              </li>
            )}
          </ul>
          <div className="flex justify-end gap-4">
            <button
              className="border border-gray-600 px-3 py-1 rounded-sm"
              onClick={() => {
                setIsDeletingRoom(false);
                setOverlayDelete(false);
              }}
            >
              Anuluj
            </button>
            <button
              className="flex px-3 py-1 rounded-sm bg-red-400 text-white font-semibold"
              onClick={handleSubmit}
            >
              Usuń pokój
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteRoomConfirmation;
