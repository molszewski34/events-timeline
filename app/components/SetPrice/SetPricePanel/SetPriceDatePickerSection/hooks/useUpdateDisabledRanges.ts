import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { useEffect, useState } from 'react';
import useFetchPrices from '../../../hooks/useFetchPrices';

interface DatePickerItem {
  startDate: Date;
  endDate: Date;
}

interface PriceDate {
  startDate: string;
  endDate: string;
}

interface Price {
  selected_rooms_ids: { id: string }[];
  dates: PriceDate;
}

function useUpdateDisabledRanges() {
  const { selectedRooms } = useSetPriceContext();

  const prices = useFetchPrices(selectedRooms);
  const [disabledRanges, setDisabledRanges] = useState<
    { start: Date; end: Date }[]
  >([]);

  useEffect(() => {
    const ranges =
      prices
        ?.filter((price: Price) =>
          selectedRooms.some(
            (selectedRoom: any) => selectedRoom.id === price.selected_rooms_ids
          )
        )
        .map((price: Price) => ({
          start: new Date(price.dates.startDate),
          end: new Date(price.dates.endDate),
        })) || [];

    setDisabledRanges(ranges);
  }, [selectedRooms, prices]);

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
