'use client';
import React, { useState, ChangeEvent } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

const AdvancePayment: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { formData, setFormData } = useAddReservationContext();

  const handleAdvancePaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^0-9,]/g, '');

    setFormData((prevData: FormData) => ({
      ...prevData,
      advancePayment: filteredValue,
    }));
  };

  return (
    <section className="flex flex-col gap-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center gap-2"
      >
        <h2 className="font-semibold text-gray-500 text-sm">Zadatek</h2>
        <hr className="bg-gray-70000 w-full" />
        <span
          className={`material-icon bg-gray-300 text-center flex items-center p-1 h-6 rounded-sm ${
            isOpen ? 'tranform rotate-180' : ''
          }`}
        >
          arrow_drop_down
        </span>
      </button>
      {isOpen && (
        <div className="flex flex-col gap-2">
          <form
            className={`border border-gray-300 flex justify-between items-center gap-2 rounded-sm  ${
              formData.selectedStatus.name === 'Wpłacono zaliczke'
                ? 'bg-gray-200'
                : 'bg-white'
            }`}
          >
            <input
              className={`w-full pl-2 py-2 focus:outline-none focus:ring-0 focus:border-transparent text-xs text-right ${
                formData.selectedStatus.name === 'Wpłacono zaliczke'
                  ? 'bg-gray-200'
                  : 'bg-white'
              }`}
              value={formData.advancePayment}
              onChange={handleAdvancePaymentChange}
              type="text"
            />
            <p className="text-gray-400 pr-12 text-sm">PLN</p>
          </form>
        </div>
      )}
    </section>
  );
};

export default AdvancePayment;
