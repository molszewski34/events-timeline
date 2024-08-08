import { useState } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import Header from './Header';
import PriceSection from './PriceSection';
import PriceInput from './PriceInput';

type ChildAge = {
  minAge: number;
  maxAge: number;
};

const Preview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    selectedCurrency,
    partialOccupancyPrice,
    weekendPrice,
    childPrice,
    ageRanges,
    stayDuration,
    longStay,
    setLongStay,
    shortStay,
    setShortStay,
  } = usePriceConfigurationContext();

  console.log(ageRanges); // Ensure this has a value

  // Example prices with two decimal places
  const standardPrice = 80.0;
  const standardWeekendPrice = 100.0;
  const standardSinglePrice = 60.0;
  const standardSingleWeekendPrice = 80.0;
  const standardChildPrice = 0.0;
  const standardWeekendChildPrice = 0.0;

  return (
    <div className="flex flex-col items-center">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div className="flex flex-col p-2 border-2 border-gray-100 mt-2 w-auto max-w-full place-self-center items-center">
          <header>
            <div className="flex gap-2 text-sm font-semibold mb-3">
              <p> Wpisz ceny w walucie:</p>{' '}
              <span className="text-green-600">{selectedCurrency}</span>
            </div>
          </header>
          <div className="flex flex-col">
            <PriceSection
              title={partialOccupancyPrice ? 'Osoba dorosła (x2)' : 'Cena'}
              prices={[
                { label: 'Standard', price: standardPrice, subLabel: '' },
                ...(weekendPrice
                  ? [{ label: 'Standard Weekend', price: standardWeekendPrice }]
                  : []),
                ...(stayDuration
                  ? [
                      {
                        label: 'Długi pobyt',
                        price: standardWeekendPrice,
                        subLabel: `od ${longStay}`,
                      },
                    ]
                  : []),
                ...(stayDuration
                  ? [
                      {
                        label: 'Krótki pobyt',
                        price: standardWeekendPrice,
                        subLabel: `do ${shortStay}`,
                      },
                    ]
                  : []),
              ]}
            />
            {partialOccupancyPrice && (
              <PriceSection
                title={partialOccupancyPrice ? 'Osoba dorosła (x1)' : 'Cena'}
                prices={[
                  { label: 'Standard', price: standardPrice },
                  ...(weekendPrice
                    ? [
                        {
                          label: 'Standard Weekend',
                          price: standardWeekendPrice,
                        },
                      ]
                    : []),
                  ...(stayDuration
                    ? [
                        {
                          label: 'Długi pobyt ',
                          price: standardWeekendPrice,
                          subLabel: `od ${longStay}`,
                        },
                      ]
                    : []),
                  ...(stayDuration
                    ? [
                        {
                          label: 'Krótki pobyt',
                          price: standardWeekendPrice,
                          subLabel: `do ${shortStay}`,
                        },
                      ]
                    : []),
                ]}
              />
            )}
          </div>
          <>
            {ageRanges.map((childAge: ChildAge) => (
              <PriceSection
                key={`${childAge.minAge}-${childAge.maxAge}`}
                title={`Dziecko (${childAge.minAge}-${childAge.maxAge})`}
                prices={[
                  { label: 'Standard', price: standardPrice, subLabel: '' },
                  ...(weekendPrice
                    ? [
                        {
                          label: 'Standard Weekend',
                          price: standardWeekendPrice,
                        },
                      ]
                    : []),
                  ...(stayDuration
                    ? [
                        {
                          label: 'Długi pobyt',
                          price: standardWeekendPrice,
                          subLabel: `od ${longStay}`,
                        },
                      ]
                    : []),
                  ...(stayDuration
                    ? [
                        {
                          label: 'Krótki pobyt',
                          price: standardWeekendPrice,
                          subLabel: `do ${shortStay}`,
                        },
                      ]
                    : []),
                ]}
              />
            ))}
          </>
        </div>
      )}
    </div>
  );
};

export default Preview;
