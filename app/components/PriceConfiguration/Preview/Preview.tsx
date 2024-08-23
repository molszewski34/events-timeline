import { useState } from 'react';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import Header from './Header';
import PriceSection from './PriceSection';
import PriceInput from './PriceInput';

type ChildAge = {
  minAge: number;
  maxAge: number;
};

const standardPrice = 80.0;
const standardWeekendPrice = 100.0;
const standardSinglePrice = 60.0;
const standardSingleWeekendPrice = 80.0;
const standardChildPrice = 0.0;
const standardWeekendChildPrice = 0.0;

const Preview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { priceSettings } = usePriceConfigurationContext();

  return (
    <div className="flex flex-col items-center">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div className="flex flex-col p-2 border-2 border-gray-100 mt-2 w-auto max-w-full place-self-center items-center">
          <header>
            <div className="flex gap-2 text-sm font-semibold mb-3">
              <p> Wpisz ceny w walucie:</p>{' '}
              <span className="text-green-600">
                {priceSettings.selectedCurrency}
              </span>
            </div>
          </header>
          <div className="flex flex-col">
            <PriceSection
              title={
                priceSettings.partialOccupancyPrice
                  ? 'Osoba dorosła (x2)'
                  : 'Cena'
              }
              prices={[
                {
                  label: 'Standard',
                  price: standardPrice ?? 0,
                  subLabel: '',
                },
                ...(priceSettings.weekendPrice
                  ? [
                      {
                        label: 'Standard Weekend',
                        price: standardWeekendPrice ?? 0,
                      },
                    ]
                  : []),
                ...(priceSettings.stayDuration
                  ? [
                      {
                        label: 'Długi pobyt',
                        price: priceSettings.longStayPrice ?? 0,
                        subLabel: `od ${priceSettings.longStay}`,
                      },
                    ]
                  : []),
                ...(priceSettings.stayDuration
                  ? [
                      {
                        label: 'Krótki pobyt',
                        price: priceSettings.shortStayPrice ?? 0,
                        subLabel: `do ${priceSettings.shortStay}`,
                      },
                    ]
                  : []),
              ]}
            />
            {priceSettings.partialOccupancyPrice && (
              <PriceSection
                title={
                  priceSettings.partialOccupancyPrice
                    ? 'Osoba dorosła (x1)'
                    : 'Cena'
                }
                prices={[
                  {
                    label: 'Standard',
                    price: standardSinglePrice ?? 0,
                  },
                  ...(priceSettings.weekendPrice
                    ? [
                        {
                          label: 'Standard Weekend',
                          price: standardSingleWeekendPrice ?? 0,
                        },
                      ]
                    : []),
                  ...(priceSettings.stayDuration
                    ? [
                        {
                          label: 'Długi pobyt ',
                          price: priceSettings.longStaySinglePrice ?? 0,
                          subLabel: `od ${priceSettings.longStay}`,
                        },
                      ]
                    : []),
                  ...(priceSettings.stayDuration
                    ? [
                        {
                          label: 'Krótki pobyt',
                          price: priceSettings.shortStaySinglePrice ?? 0,
                          subLabel: `do ${priceSettings.shortStay}`,
                        },
                      ]
                    : []),
                ]}
              />
            )}
          </div>
          <>
            {priceSettings.childPrice && (
              <>
                {priceSettings.ageRanges.map(
                  (childAge: ChildAge) =>
                    childAge.minAge !== null &&
                    childAge.maxAge !== null && (
                      <PriceSection
                        key={`${childAge.minAge}-${childAge.maxAge}`}
                        title={`Dziecko (${childAge.minAge}-${childAge.maxAge})`}
                        prices={[
                          {
                            label: 'Standard',
                            price: standardChildPrice ?? 0,
                            subLabel: '',
                          },
                          ...(priceSettings.weekendPrice
                            ? [
                                {
                                  label: 'Standard Weekend',
                                  price: standardWeekendChildPrice ?? 0,
                                },
                              ]
                            : []),
                          ...(priceSettings.stayDuration
                            ? [
                                {
                                  label: 'Długi pobyt',
                                  price: priceSettings.longStayChildPrice ?? 0,
                                  subLabel: `od ${priceSettings.longStay}`,
                                },
                              ]
                            : []),
                          ...(priceSettings.stayDuration
                            ? [
                                {
                                  label: 'Krótki pobyt',
                                  price: priceSettings.shortStayChildPrice ?? 0,
                                  subLabel: `do ${priceSettings.shortStay}`,
                                },
                              ]
                            : []),
                        ]}
                      />
                    )
                )}
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default Preview;
