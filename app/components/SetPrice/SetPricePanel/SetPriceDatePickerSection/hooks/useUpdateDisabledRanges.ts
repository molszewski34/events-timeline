import { fetchPrices } from '@/app/actions/fetchPrices';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import useSupabaseBrowser from '@/utils/supabase-browser';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

interface DatePickerItem {
  startDate: Date;
  endDate: Date;
}

interface PriceDate {
  startDate: string;
  endDate: string;
}

interface Price {
  selected_rooms: { id: string }[];
  dates: PriceDate[];
}

function useUpdateDisabledRanges() {
  const supabase = useSupabaseBrowser();
  const { priceFormData } = useSetPriceContext();

  const { data: pricesResponse } = useQuery({
    queryKey: ['fetchPrices', priceFormData.selectedRooms],
    queryFn: () => fetchPrices(supabase),
    enabled: Boolean(priceFormData.selectedRooms?.length),
  });

  const prices = pricesResponse?.data;
  const [disabledRanges, setDisabledRanges] = useState<
    { start: Date; end: Date }[]
  >([]);

  useEffect(() => {
    const ranges =
      prices?.flatMap((price: Price) =>
        price.selected_rooms.some((room) =>
          priceFormData.selectedRooms.some(
            (selectedRoom: any) => selectedRoom.id === room.id
          )
        )
          ? price.dates
              .filter((date) => date.startDate && date.endDate)
              .map((date) => ({
                start: new Date(date.startDate),
                end: new Date(date.endDate),
              }))
          : []
      ) || [];

    setDisabledRanges(ranges);
  }, [priceFormData.selectedRooms, prices]);

  const updateDisabledRanges = (pickers: DatePickerItem[]) => {
    const ranges = pickers
      .filter((picker) => picker.startDate && picker.endDate)
      .map((picker) => ({
        start: picker.startDate,
        end: picker.endDate,
      }));
    setDisabledRanges(ranges);
  };

  return { updateDisabledRanges, disabledRanges, setDisabledRanges };
}

export default useUpdateDisabledRanges;
