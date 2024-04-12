import { useState } from 'react';

interface Status {
  name: string;
  color: string;
}

const BookingStatus = () => {
  const statuses = [
    { name: 'Brak płatności', color: '#f87171' },
    { name: 'Wpłacono zaliczke', color: '#fde68a' },
    { name: 'Zapłacono', color: '#a3e635' },
    { name: 'Anulowano', color: '#a78bfa' },
    { name: 'Niedostępny', color: '#a3a3a3' },
  ];
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(
    statuses[0]
  );
  const [statusListOpen, setStatusListOpen] = useState(false);

  const handleSelectOption = (status: Status) => {
    setSelectedStatus(status);
  };
  return (
    <div className="flex flex-col gap-2">
      <button
        className="flex items-center gap-2 bg-slate-200 p-2 rounded-sm"
        onClick={() => setStatusListOpen(!statusListOpen)}
      >
        <div
          className={`w-8 h-8 rounded-full flex justify-center items-center`}
          style={{ backgroundColor: selectedStatus?.color }}
        >
          <span className="material-icon text-white">done</span>
        </div>

        {selectedStatus?.name}
      </button>

      {statuses.map((status, index) => (
        <div className={`${statusListOpen ? '' : 'h-0 overflow-hidden'}`}>
          {selectedStatus?.name != status.name && (
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
