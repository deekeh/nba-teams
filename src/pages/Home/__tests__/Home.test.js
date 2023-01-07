import { cleanup, render, screen } from "@testing-library/react";
import Home from "../Home";

afterEach(cleanup);

describe("Home page", function () {
  it("renders itself", function () {
    render(<Home />);
    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();

    const homePageHeader = screen.getByTestId("home-page-header");
    expect(homePageHeader).toHaveTextContent("NBA Teams");
  });
});
