import { useState } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';

const Preview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCurrency, partialOccupancyPrice, weekendPrice } =
    usePriceConfigurationContext();

  const standardPrice = 80.0;
  const standardWeekendPrice = 100.0;
  const standardSinglePrice = 60.0;
  const standardSingleWeekendPrice = 80.0;

  return (
    <div className="flex flex-col">
      <header className="flex justify-between bg-gray-100 p-2">
        <p className="text-sm">Podgląd</p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center material-icon text-2xl bg-gray-300 w-5 h-5 rounded-sm"
        >
          {isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
        </button>
      </header>
      {isOpen && (
        <div className="flex flex-col p-2 border-2 border-gray-100 mt-2 cursor-not-allowed w-full max-w-[370px] place-self-center">
          <header>
            <div className="flex gap-2 text-sm font-semibold mb-3">
              <p> Wpisz ceny w walucie:</p>{' '}
              <span className="text-green-600">{selectedCurrency}</span>
            </div>
          </header>
          {partialOccupancyPrice && (
            <div className="flex flex-col border-b border-gray-300 pb-4">
              <header className="text-sm text-gray-500">
                Osoba dorosła (x2)
              </header>
              <div className="flex justify-between mt-2 gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs text-gray-500 font-medium"
                      htmlFor="standard"
                    >
                      Standard
                    </label>
                    <input
                      className="text-xs border border-gray-300 py-2 px-1 text-right max-w-36"
                      readOnly
                      type="text"
                      defaultValue={standardPrice.toFixed(2)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs text-gray-500 font-medium"
                      htmlFor="standard_weekend"
                    >
                      Standard Weekend
                    </label>
                    <input
                      className="text-xs border border-gray-300 py-2 px-1 text-right max-w-36"
                      readOnly
                      type="text"
                      defaultValue={standardWeekendPrice.toFixed(2)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {weekendPrice && (
            <div className="flex flex-col border-b border-gray-300 pb-4">
              <header className="text-sm text-gray-500">
                Osoba dorosła (x1)
              </header>
              <div className="flex justify-between mt-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs text-gray-500 font-medium"
                      htmlFor="standard"
                    >
                      Standard
                    </label>
                    <input
                      className="text-xs border border-gray-300 py-2 px-1 text-right max-w-36"
                      type="text"
                      readOnly
                      defaultValue={standardSinglePrice.toFixed(2)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs text-gray-500 font-medium"
                      htmlFor="standard_weekend"
                    >
                      Standard Weekend
                    </label>
                    <input
                      className="text-xs border border-gray-300 py-2 px-1 text-right max-w-36"
                      type="text"
                      readOnly
                      defaultValue={standardSingleWeekendPrice.toFixed(2)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Preview;
