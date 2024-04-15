import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import Price from './Price';
import {
  AddReservationWrapper,
  useAddReservationContext,
} from '@/app/contexts/AddReservation/AddReservationProvider'; // Adjust the import path based on your directory structure

// Mock the context values
jest.mock(
  '../../../../../../../contexts/AddReservation/AddReservationProvider',
  () => ({
    ...jest.requireActual(
      '../../../../../../../contexts/AddReservation/AddReservationProvider'
    ), // Use the actual implementation for other exports
    useAddReservationContext: jest.fn(), // Mocking the useContext hook
  })
);

describe('Price component', () => {
  beforeEach(() => {
    (useAddReservationContext as jest.Mock).mockReturnValue({
      daysBetween: 5,
      selectedRoom: { roomPrice: 100 },
      totalNumOfGuests: 3,
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
    expect(finalPriceInput).toHaveValue('1500'); // 5 days * 3 guests * 100 PLN/day
  });

  it('should display the room price correctly', () => {
    const { getByRole } = render(
      <AddReservationWrapper>
        <Price />
      </AddReservationWrapper>
    );

    const roomPriceInput = getByRole('textbox', { name: /cena za dzień/i });
    expect(roomPriceInput).toHaveValue('100'); // Assuming roomPrice is 100 PLN for testing
  });
});
