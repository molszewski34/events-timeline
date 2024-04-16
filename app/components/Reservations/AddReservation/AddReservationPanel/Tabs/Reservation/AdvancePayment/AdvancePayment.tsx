import React, { useState, ChangeEvent } from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

const AdvancePayment: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { advancePayment, setAdvancePayment } = useAddReservationContext();
  const handleAdvancePaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAdvancePayment(event.target.value);
  };

  console.log(advancePayment);

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <h2 className="font-semibold text-gray-400">Zaliczka</h2>
        <hr className="bg-gray-70000 w-full" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="material-icon bg-gray-300 text-center flex items-center p-1 h-6 rounded-sm"
        >
          arrow_drop_down
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2">
          <form className="border border-gray-300 flex justify-between items-center gap-2 rounded-sm">
            <input
              className="w-full pl-2 py-2"
              value={advancePayment}
              onChange={handleAdvancePaymentChange}
              type="text"
              aria-label="Cena za dzień"
            />
            <p className="text-gray-400 pr-12">PLN</p>
          </form>
        </div>
      )}
    </section>
  );
};

export default AdvancePayment;
