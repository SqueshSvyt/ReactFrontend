import { render, screen } from '@testing-library/react';
import App from './App';


export const renderComponent = (Component) => {
  render(<Component />);
};

// Reusable test function to check if a specific text is present in the component
export const checkText = (text) => {
  expect(screen.getByText(text)).toBeInTheDocument();
};