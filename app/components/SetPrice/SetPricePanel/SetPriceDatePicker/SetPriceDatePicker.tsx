import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SetPriceDatePickerProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  onRemove: () => void;
  isDefault: boolean;
  disabledRanges: DisabledRange[];
}

interface DisabledRange {
  start: Date;
  end: Date;
}

const SetPriceDatePicker: React.FC<SetPriceDatePickerProps> = ({
  startDate,
  endDate,
  onDateChange,
  onRemove,
  isDefault,
  disabledRanges,
}) => {
  const handleStartDateChange = (date: Date) => {
    onDateChange(date, endDate);
  };

  const handleEndDateChange = (date: Date) => {
    onDateChange(startDate, date);
  };

  return (
    <div className="flex justify-around mt-2 gap-2 w-full">
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm">Od</label>
        <div className="relative w-full">
          <DatePicker
            className={'w-full border border-gray-200 p-2 text-xs pr-10'}
            dateFormat="yyyy-MM-dd h:mm"
            selected={startDate || null}
            onChange={handleStartDateChange}
            showTimeInput
            timeInputLabel="Czas:"
            data-testid="start-date-picker"
            excludeDates={disabledRanges.flatMap(({ start, end }) => {
              const dates = [];
              let currentDate = new Date(start);
              while (currentDate <= end) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
              }
              return dates;
            })}
          />
          <span className="material-icons absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm">
            calendar_today
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm">Do</label>
        <div className="relative w-full">
          <DatePicker
            className={'w-full border border-gray-200 p-2 text-xs pr-10'}
            dateFormat="yyyy-MM-dd h:mm"
            selected={endDate || null}
            onChange={handleEndDateChange}
            showTimeInput
            timeInputLabel="Czas:"
            data-testid="end-date-picker"
            excludeDates={disabledRanges.flatMap(({ start, end }) => {
              const dates = [];
              let currentDate = new Date(start);
              while (currentDate <= end) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
              }
              return dates;
            })}
          />
          <span className="material-icons absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm">
            calendar_today
          </span>
        </div>
      </div>

      {!isDefault ? (
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500  hover:text-red-700 flex items-end pb-1"
          aria-label="Remove date picker"
        >
          <span className="material-icons text-xl">delete</span>
        </button>
      ) : (
        <div className="w-10 h-[62px] pb-1"></div>
      )}
    </div>
  );
};

export default SetPriceDatePicker;
