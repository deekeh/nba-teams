import { render, screen } from '@testing-library/react';
import App from './App';

describe("Application", function () {
  test('renders itself', () => {
    render(<App />);
    const linkElement = screen.getByText("Team Name");
    expect(linkElement).toBeInTheDocument();
  });
});
