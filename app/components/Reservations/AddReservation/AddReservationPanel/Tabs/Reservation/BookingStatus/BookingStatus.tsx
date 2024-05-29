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
      {statuses.map((status, index) => (
        <div>
          <button
            className={`flex items-center gap-2 hover:bg-slate-200 p-2 rounded-sm w-full text-sm  ${
              formData.selectedStatus?.name === status.name ? 'bg-gray-200' : ''
            }`}
            key={index}
            onClick={() => {
              handleSelectOption(status);
              setStatusListOpen(false);
            }}
          >
            <div
              className={`w-8 h-8 rounded-full flex justify-center items-center text-white`}
              style={{ backgroundColor: status.color }}
            >
              {formData.selectedStatus?.name === status.name && <i>done</i>}
            </div>
            {status.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookingStatus;
