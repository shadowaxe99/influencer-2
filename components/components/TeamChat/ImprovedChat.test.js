import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ImprovedChat from './ImprovedChat';

describe('ImprovedChat', () => {
  test('renders ImprovedChat component', () => {
    render(<ImprovedChat />);
  });

  test('starts and stops voice message', async () => {
    const { getByText, queryByText } = render(<ImprovedChat />);

    fireEvent.click(getByText(/microphone-icon/i));
    expect(getByText(/Recording started/i)).toBeInTheDocument();

    await waitFor(() => expect(queryByText(/Recording started/i)).not.toBeInTheDocument());
    expect(getByText(/Recording ended/i)).toBeInTheDocument();
  });

  test('sends a voice message', () => {
    const { getByText, queryByText } = render(<ImprovedChat />);

    fireEvent.click(getByText(/microphone-icon/i));
    fireEvent.click(getByText(/Recording ended/i));

    expect(queryByText(/Recording ended/i)).not.toBeInTheDocument();
    expect(getByText(/Voice Note/i)).toBeInTheDocument();
  });
});