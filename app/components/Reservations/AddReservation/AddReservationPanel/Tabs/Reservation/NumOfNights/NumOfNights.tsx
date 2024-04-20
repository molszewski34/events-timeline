import React from 'react';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';

const NumOfNights: React.FC = () => {
  const { daysBetween, setDaysBetween, formData, setFormData } =
    useAddReservationContext();

  // console.log(daysBetween);

  const incrementEndDate = (amount: number): void => {
    const newEndDate = new Date(formData.selectedEndDate);
    newEndDate.setDate(newEndDate.getDate() + amount);
    // setSelectedEndDate(newEndDate);
    setFormData((prevData: Date) => ({
      ...prevData,
      selectedEndDate: newEndDate,
    }));
  };

  const decrementEndDate = (amount: number): void => {
    if (daysBetween - amount >= 0) {
      const newEndDate = new Date(formData.selectedEndDate);
      newEndDate.setDate(newEndDate.getDate() - amount);
      // setSelectedEndDate(newEndDate);
      setFormData((prevData: Date) => ({
        ...prevData,
        selectedEndDate: newEndDate,
      }));
    } else {
      setDaysBetween(0);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-bold text-gray-400">Liczba nocy</h2>
      <form className="border border-gray-300 flex justify-between p-1">
        <button
          type="button"
          className="w-8 bg-gray-300 rounded-sm"
          onClick={() => decrementEndDate(1)}
        >
          -
        </button>
        <input
          value={daysBetween}
          className="text-center"
          type="text"
          readOnly
        />
        <button
          type="button"
          className="w-8 bg-gray-300 rounded-sm"
          onClick={() => incrementEndDate(1)}
        >
          +
        </button>
      </form>
    </div>
  );
};

export default NumOfNights;
