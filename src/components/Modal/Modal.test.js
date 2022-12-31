import { render, screen } from '@testing-library/react';
import Modal from "./Modal.jsx";

describe("Modal component", function () {
  it("renders itself", function () {
    render(<Modal />);
    const text = screen.getByText("Search Results");
    expect(text).toBeInTheDocument();
  });
});
