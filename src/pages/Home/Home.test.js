import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home page", function () {
  it("renders itself", function () {
    render(<Home />);
    const text = screen.getByText("NBA Teams");
    expect(text).toBeInTheDocument();
  });
});
