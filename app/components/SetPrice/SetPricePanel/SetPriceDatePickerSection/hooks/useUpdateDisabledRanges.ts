import { fetchPrices } from '@/app/actions/fetchPrices';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

function useUpdateDisabledRanges() {
  const supabase = useSupabaseBrowser();
  const { data: pricesResponse, error } = useQuery({
    queryKey: ['fetchPrices'],
    queryFn: () => fetchPrices(supabase),
  });

  const prices = pricesResponse?.data;
  const { priceFormData } = useSetPriceContext();

  const [disabledRanges, setDisabledRanges] = useState<
    { start: Date; end: Date }[]
  >([]);

  useEffect(() => {
    const hasOverlap = prices?.some((price: any) =>
      price.selected_rooms.some((room: { id: string }) =>
        priceFormData.selectedRooms.some(
          (selectedRoom: any) => selectedRoom.id === room.id
        )
      )
    );

    if (hasOverlap) {
      const ranges = prices.flatMap((price: any) =>
        price.dates
          .filter(
            (date: { startDate: string; endDate: string }) =>
              date.startDate && date.endDate
          )
          .map((date: { startDate: string; endDate: string }) => ({
            start: new Date(date.startDate),
            end: new Date(date.endDate),
          }))
      );
      setDisabledRanges(ranges);
    }
  }, [priceFormData.selectedRooms, prices]);

  const updateDisabledRanges = (pickers: DatePickerItem[]) => {
    const ranges = pickers
      .filter((picker: DatePickerItem) => picker.startDate && picker.endDate)
      .map((picker: DatePickerItem) => ({
        start: picker.startDate as Date,
        end: picker.endDate as Date,
      }));
    setDisabledRanges(ranges);
  };

  return { updateDisabledRanges, disabledRanges, setDisabledRanges };
}

export default useUpdateDisabledRanges;
