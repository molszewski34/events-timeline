import { useState } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
import { statuses } from './data';
interface Status {
  name: string;
  color: string;
}

const BookingStatus = () => {
  const { formData, setFormData } = useAddReservationContext();
  const [statusListOpen, setStatusListOpen] = useState(false);

  const handleSelectOption = (status: Status) => {
    setFormData((prevData: Status) => ({
      ...prevData,
      selectedStatus: status,
    }));
  };
  return (
    <div className="flex flex-col gap-2">
      <button
        className="flex items-center gap-2 bg-slate-200 p-2 rounded-sm"
        onClick={() => setStatusListOpen(!statusListOpen)}
      >
        <div
          className={`w-8 h-8 rounded-full flex justify-center items-center`}
          style={{ backgroundColor: formData.selectedStatus?.color }}
        >
          <span className="material-icon text-white">done</span>
        </div>

        {formData.selectedStatus?.name}
      </button>

      {statuses.map((status, index) => (
        <div className={`${statusListOpen ? '' : 'h-0 overflow-hidden'}`}>
          {formData.selectedStatus?.name != status.name && (
            <button
              className="flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm"
              key={index}
              onClick={() => {
                handleSelectOption(status);
                setStatusListOpen(false);
              }}
            >
              <div
                className={`w-8 h-8 rounded-full`}
                style={{ backgroundColor: status.color }}
              ></div>
              {status.name}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingStatus;
