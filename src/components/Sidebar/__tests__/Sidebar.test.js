import { cleanup, render, screen } from '@testing-library/react';
import Sidebar from "../Sidebar.jsx";
import gameData from "./data/gameData.json";

afterEach(cleanup);

describe("Sidebar component", function () {
  it("renders itself", function () {
    render(<Sidebar
      state={true}
      data={gameData}
    />);

    const component = screen.getByTestId("sidebar-component");
    expect(component).toBeInTheDocument();
  });

  it("tests team data when available", function () {
    render(<Sidebar
      state={true}
      data={gameData}
    />);

    const homeTeamName = screen.getByTestId("home-team-name");
    expect(homeTeamName).toHaveTextContent("Celtics");

    const homeTeamFullName = screen.getByTestId("home-team-full-name");
    expect(homeTeamFullName).toHaveTextContent(/^Boston Celtics$/);

    const period = screen.getByTestId("period");
    expect(period).toHaveTextContent(/^4$/);
  });

  it("tests team data when unavailable", function () {
    render(<Sidebar
      state={true}
      data={"loading"}
    />);

    const homeTeamName = screen.getByTestId("home-team-name");
    expect(homeTeamName).toHaveTextContent("Loading...");
  });
});
