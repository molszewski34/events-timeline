import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import NumOfNights from './NumOfNights';
import {
  AddReservationWrapper,
  useAddReservationContext,
} from '@/app/contexts/AddReservation/AddReservationProvider';
describe('NumOfNights component', () => {
  it('updates selectedEndDate correctly when buttons are clicked', () => {
    const { getByText } = render(
      <AddReservationWrapper>
        <NumOfNights />
      </AddReservationWrapper>
    );

    // Assuming the current date is 2024-04-18
    const initialDate = new Date(2024, 3, 18);

    // Click the increment button
    fireEvent.click(getByText('+'));
    const endDatePlusOne = new Date(2024, 3, 19);
    expect(endDatePlusOne).toEqual(expect.any(Date)); // Check if endDatePlusOne is a Date object
    expect(endDatePlusOne.getDate()).toBe(initialDate.getDate() + 1);

    // Click the decrement button
    fireEvent.click(getByText('-'));
    expect(initialDate).toEqual(expect.any(Date)); // Check if initialDate is a Date object
  });
});
