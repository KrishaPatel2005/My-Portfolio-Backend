import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from './Hero';

test('renders hero component', () => {
  render(<Hero />);
  expect(screen.getByText(/Krisha/i)).toBeInTheDocument();
});
