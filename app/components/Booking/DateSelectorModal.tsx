import React from 'react';

interface DateSelectorModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  month: string;
  year: string;
  incrementMonth: () => void;
  decrementMonth: () => void;
  incrementYear: () => void;
  decrementYear: () => void;
}

const DateSelectorModal: React.FC<DateSelectorModalProps> = ({
  isModalOpen,
  closeModal,
  month,
  year,
  incrementMonth,
  decrementMonth,
  incrementYear,
  decrementYear,
}) => (
  <>
    {isModalOpen && (
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[180px] flex items-center justify-center z-50 animate-slide-down shadow-md">
        <div className="w-full bg-white shadow-lg flex flex-col">
          <div className="flex bg-green-600 text-white text-center w-full py-4 justify-evenly">
            <button onClick={decrementMonth}>
              <i>arrow_back_ios</i>
            </button>
            <h2 className="text-2xl">{month}</h2>
            <button onClick={incrementMonth}>
              <i>arrow_forward_ios</i>
            </button>
          </div>
          <div className="flex text-center w-full justify-evenly items-center">
            <button onClick={decrementYear}>
              <i>arrow_back_ios</i>
            </button>
            <p className="flex py-4 mt-2 text-xl font-bold">{year}</p>
            <button onClick={incrementYear}>
              <i>arrow_forward_ios</i>
            </button>
          </div>
          <button
            onClick={closeModal}
            className="py-2 px-3 bg-green-600 text-white rounded-t-full text-4xl w-14 h-14 place-self-center"
          >
            <i>check</i>
          </button>
        </div>
      </div>
    )}
  </>
);

export default DateSelectorModal;
