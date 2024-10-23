import React, { useState } from 'react';

function useUpdateDisabledRanges() {
  const [disabledRanges, setDisabledRanges] = useState<
    { start: Date; end: Date }[]
  >([]);

  const updateDisabledRanges = (pickers: DatePickerItem[]) => {
    const ranges = pickers
      .filter((picker: DatePickerItem) => picker.startDate && picker.endDate)
      .map((picker: DatePickerItem) => ({
        start: picker.startDate as Date,
        end: picker.endDate as Date,
      }));
    setDisabledRanges(ranges);
  };
  return { updateDisabledRanges, disabledRanges };
}

export default useUpdateDisabledRanges;
