import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Price from './Price';
import {
  AddReservationWrapper,
  useAddReservationContext,
} from '@/app/contexts/AddReservation/AddReservationProvider';
jest.mock(
  '../../../../../../../contexts/AddReservation/AddReservationProvider',
  () => ({
    ...jest.requireActual(
      '../../../../../../../contexts/AddReservation/AddReservationProvider'
    ),
    useAddReservationContext: jest.fn(),
  })
);

describe('Price component', () => {
  beforeEach(() => {
    (useAddReservationContext as jest.Mock).mockReturnValue({
      setPrice: jest.fn(),
      daysBetween: 5,
      totalNumOfGuests: 3,
      formData: {
        selectedRoom: { roomPrice: 65 },
        advancePayment: 100,
        deposit: 200,
        paymentOnPlace: 100,
        includedTax: true,
        tax: 38.5,
      },
    });
  });

  it('should calculate the final price correctly', () => {
    const { getByRole } = render(
      <AddReservationWrapper>
        <Price />
      </AddReservationWrapper>
    );
    const calculateButton = getByRole('button', { name: /calculate/i });
    userEvent.click(calculateButton);
    const { setPrice } = useAddReservationContext();
    expect(setPrice).toHaveBeenCalledWith(875);
  });
});
