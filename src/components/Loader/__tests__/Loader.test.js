import { cleanup, render, screen } from '@testing-library/react';
import Loader from "../Loader.jsx";

afterEach(cleanup);

describe("Loader component", function () {
  it("loads itself", function () {
    render(<Loader />);

    const component = screen.getByTestId("loader-component");
    expect(component).toBeInTheDocument();
  });
});
