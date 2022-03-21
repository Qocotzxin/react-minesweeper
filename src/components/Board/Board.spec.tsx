import { useMediaQuery } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { Message, Piece } from "../../enum";
import { Board } from "./Board";
import tileReducer from "../../features/Tiles/tileSlice";
import { FC } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const boardMockProps = {
  boardMap: [
    `${Piece.uncovered}${Piece.uncovered}${Piece.uncovered}${Piece.uncovered}`,
  ],
  difficulty: 1,
  message: Message.ok,
};

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(() => false),
}));

afterAll(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

const defaultState = {
  availableFlags: 10,
  flaggedTiles: [],
};

const Wrapper: FC = ({ children }) => {
  return (
    <Provider
      store={configureStore({
        reducer: { tile: tileReducer },
        preloadedState: { tile: defaultState },
      })}
    >
      {children}
    </Provider>
  );
};

describe("Board", () => {
  describe("Snapshot", () => {
    it("Should render correctly and match snapshot.", () => {
      const { container } = render(
        <Wrapper>
          <Board {...boardMockProps} />
        </Wrapper>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("Behavior", () => {
    it("Should render a DefaultTile component for each string equal to □.", () => {
      render(
        <Wrapper>
          <Board {...boardMockProps} />
        </Wrapper>
      );

      const defaultButtons = screen.getAllByTestId("DefaultTile");
      const UncoveredTiles = screen.queryAllByTestId("UncoveredTile");

      expect(defaultButtons.length).toEqual(4);
      expect(UncoveredTiles.length).toEqual(0);
    });

    it("Should render a UncoveredTile component for each string NOT equal to □.", () => {
      render(
        <Wrapper>
          <Board boardMap={["1"]} difficulty={1} message={Message.ok} />
        </Wrapper>
      );

      const defaultButtons = screen.queryAllByTestId("DefaultTile");
      const UncoveredTiles = screen.getAllByTestId("UncoveredTile");

      expect(defaultButtons.length).toEqual(0);
      expect(UncoveredTiles.length).toEqual(1);
    });

    it("Should set the max height of the board to 15 rows in mobile resolutions.", () => {
      render(
        <Wrapper>
          <Board {...boardMockProps} />
        </Wrapper>
      );

      expect(screen.getByTestId("Board")).toHaveStyle({
        "max-height": "240px",
      });
    });

    it("Should set the max height of the board to 30 rows in desktop resolutions.", () => {
      (useMediaQuery as jest.Mock).mockImplementation(() => true);
      render(
        <Wrapper>
          <Board {...boardMockProps} />
        </Wrapper>
      );

      expect(screen.getByTestId("Board")).toHaveStyle({
        "max-height": "480px",
      });
    });

    it("Should have a border if the board map have elements.", () => {
      render(
        <Wrapper>
          <Board {...boardMockProps} />
        </Wrapper>
      );

      expect(screen.getByTestId("Board")).toHaveStyle({
        border: "4px solid whitesmoke",
      });
    });

    it("Should NOT have a border if the board map is empty.", () => {
      render(
        <Wrapper>
          <Board boardMap={[]} difficulty={1} message={Message.ok} />
        </Wrapper>
      );

      expect(screen.getByTestId("Board")).toHaveStyle({
        border: "none",
      });
    });

    it("Should display an overlay when the game is over.", () => {
      render(
        <Wrapper>
          <Board boardMap={[]} difficulty={1} message={Message.win} />
        </Wrapper>
      );

      expect(screen.getByTestId("Board-overlay")).toBeInTheDocument();
    });
  });
});
