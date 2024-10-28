import { useCallback } from 'react';

interface DatePickerItem {
  id: number;
  isDefault: boolean;
  startDate: Date | null;
  endDate: Date | null;
}

interface FormData {
  dates: DatePickerItem[];
}

interface UseHandleDateChangeProps {
  priceFormData: FormData;
  setPriceFormData: React.Dispatch<React.SetStateAction<FormData>>;
  disabledRanges: { start: Date | null; end: Date | null }[];
  setDisabledRanges: React.Dispatch<
    React.SetStateAction<{ start: Date | null; end: Date | null }[]>
  >;
}

const useHandleDateChange = ({
  priceFormData,
  setPriceFormData,
  disabledRanges,
  setDisabledRanges,
}: UseHandleDateChangeProps) => {
  const handleDateChange = useCallback(
    (id: number, newStartDate: Date, newEndDate: Date) => {
      const updatedPickers = priceFormData.dates.map((picker) =>
        picker.id === id
          ? { ...picker, startDate: newStartDate, endDate: newEndDate }
          : picker
      );

      const updatedRanges = updatedPickers.map(({ startDate, endDate }) => ({
        start: startDate,
        end: endDate,
      }));

      setPriceFormData((prevData) => ({
        ...prevData,
        dates: updatedPickers,
      }));

      setDisabledRanges([...disabledRanges, ...updatedRanges]);
    },
    [priceFormData, setPriceFormData, disabledRanges, setDisabledRanges]
  );

  return { handleDateChange };
};

export default useHandleDateChange;
