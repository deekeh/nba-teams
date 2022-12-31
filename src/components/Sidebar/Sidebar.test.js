import { render, screen } from '@testing-library/react';
import Sidebar from "./Sidebar.jsx";

describe("Sidebar component", function () {
  it("renders itself", function () {
    render(<Sidebar />);
    const text = screen.getByText("Team Full Name");
    expect(text).toBeInTheDocument();
  });
});
