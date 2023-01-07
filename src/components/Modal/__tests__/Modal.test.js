import { cleanup, render, screen } from '@testing-library/react';
import Modal from "../Modal.jsx";

import playerData from "./data/playerData.json";

afterEach(cleanup);

describe("Modal component", function () {
  it("renders itself", function () {
    render(<Modal
      playerData={playerData}
      showModal={true}
    />);
    const component = screen.getByTestId("modal-component");
    expect(component).toBeInTheDocument();
  });

  it("shows the list of players", function () {
    render(<Modal
      playerData={playerData}
      showModal={true}
    />);
    const text = screen.getByText("Search Results");
    expect(text).toBeInTheDocument();

    playerData.forEach((player, idx) => {
      const playerListItem = screen.getByTestId(`player-${idx}`);
      expect(playerListItem).toHaveTextContent(`${player.first_name} ${player.last_name}`);
    });
  });
});
