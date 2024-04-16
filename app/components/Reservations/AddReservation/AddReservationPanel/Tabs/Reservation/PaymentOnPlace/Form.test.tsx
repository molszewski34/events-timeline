import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from './Form';

test('handleChange updates the value correctly', () => {
  const mockOnChange = jest.fn();

  const { getByRole } = render(<Form value={0} onChange={mockOnChange} />);

  const inputElement = getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: '10' } });

  expect(mockOnChange).toHaveBeenCalledWith(10);

  fireEvent.change(inputElement, { target: { value: '' } });

  expect(mockOnChange).toHaveBeenCalledWith(0);
});
