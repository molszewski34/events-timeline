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
      daysBetween: 5,
      selectedRoom: { roomPrice: 100 },
      totalNumOfGuests: 3,
      advancePayment: 100,
      deposit: 200,
      paymentOnPlace: 100,
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
    const finalPriceInput = getByRole('textbox', { name: /finalna cena/i });
    expect(finalPriceInput).toHaveValue('1100');
  });

  it('should display the room price correctly', () => {
    const { getByRole } = render(
      <AddReservationWrapper>
        <Price />
      </AddReservationWrapper>
    );

    const roomPriceInput = getByRole('textbox', { name: /cena za dzień/i });
    expect(roomPriceInput).toHaveValue('100');
  });
});
