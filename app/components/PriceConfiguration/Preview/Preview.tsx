import { useState } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import Header from './Header';
import PriceSection from './PriceSection';

const Preview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCurrency, partialOccupancyPrice, weekendPrice } =
    usePriceConfigurationContext();

  // Example prices with two decimal places
  const standardPrice = 80.0;
  const standardWeekendPrice = 100.0;
  const standardSinglePrice = 60.0;
  const standardSingleWeekendPrice = 80.0;

  return (
    <div className="flex flex-col">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div className="flex flex-col p-2 border-2 border-gray-100 mt-2 cursor-not-allowed w-full max-w-[370px] place-self-center">
          <header>
            <div className="flex gap-2 text-sm font-semibold mb-3">
              <p> Wpisz ceny w walucie:</p>{' '}
              <span className="text-green-600">{selectedCurrency}</span>
            </div>
          </header>
          {partialOccupancyPrice && (
            <PriceSection
              title="Osoba dorosła (x2)"
              prices={[
                { label: 'Standard', price: standardPrice },
                { label: 'Standard Weekend', price: standardWeekendPrice },
              ]}
            />
          )}
          {weekendPrice && (
            <PriceSection
              title="Osoba dorosła (x1)"
              prices={[
                { label: 'Standard', price: standardSinglePrice },
                {
                  label: 'Standard Weekend',
                  price: standardSingleWeekendPrice,
                },
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Preview;
