import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FC } from "react";
import { Provider } from "react-redux";
import { Message } from "../../enum";
import tileReducer from "../Tiles/tileSlice";
import { Game } from "./Game";
import gameReducer, { GameState } from "./gameSlice";

interface WrapperProps {
  preloadedState?: GameState;
}

const defaultGameState = {
  isLoadingBoard: false,
  map: [],
  isReady: true,
  message: Message.ok,
  difficulty: 1,
};

const defaultTileState = {
  availableFlags: 10,
  flaggedTiles: [],
};

const Wrapper: FC<WrapperProps> = ({ preloadedState = defaultGameState }) => {
  return (
    <Provider
      store={configureStore({
        reducer: { game: gameReducer, tile: tileReducer },
        preloadedState: { game: preloadedState, tile: defaultTileState },
      })}
    >
      <Game />
    </Provider>
  );
};

describe("Game", () => {
  describe("Snapshot", () => {
    it("Should render correctly and match snapshot.", () => {
      const { container } = render(<Wrapper />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("Behavior.", () => {
    it("Should render a progress bar when the board is still loading.", () => {
      const state = {
        isLoadingBoard: true,
        map: [],
        isReady: false,
        message: Message.ok,
        difficulty: 1,
      };
      render(<Wrapper preloadedState={state} />);
      expect(screen.getAllByRole("progressbar").length).toBeGreaterThan(0);
      expect(screen.queryByTestId("Board")).not.toBeInTheDocument();
    });

    it("Should render the board when its already loaded.", () => {
      const state = {
        isLoadingBoard: false,
        map: [],
        isReady: true,
        message: Message.ok,
        difficulty: 1,
      };
      render(<Wrapper preloadedState={state} />);
      expect(screen.getByTestId("Board")).toBeInTheDocument();
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    it("Should render the message component when message is different from 'OK'.", () => {
      const state = {
        isLoadingBoard: false,
        map: [],
        isReady: true,
        message: Message.lose,
        difficulty: 1,
      };
      render(<Wrapper preloadedState={state} />);
      expect(screen.getByTestId("ResultMessage")).toBeInTheDocument();
    });

    it("Should NOT render the message component when message is 'OK'.", () => {
      const state = {
        isLoadingBoard: false,
        map: [],
        isReady: true,
        message: Message.ok,
        difficulty: 1,
      };
      render(<Wrapper preloadedState={state} />);
      expect(screen.queryByTestId("ResultMessage")).not.toBeInTheDocument();
    });

    it("Should NOT render the message component when message is 'OK'.", () => {
      const state = {
        isLoadingBoard: false,
        map: [],
        isReady: true,
        message: Message.ok,
        difficulty: 1,
      };
      render(<Wrapper preloadedState={state} />);
      expect(screen.queryByTestId("ResultMessage")).not.toBeInTheDocument();
    });

    it("Should update the isLoadingBoard and message states when start game button is clicked.", () => {
      const state = {
        isLoadingBoard: false,
        map: [],
        isReady: true,
        message: Message.win,
        difficulty: 1,
      };
      render(<Wrapper preloadedState={state} />);
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getAllByRole("progressbar").length).toBeGreaterThan(0);
      expect(screen.queryByTestId("ResultMessage")).not.toBeInTheDocument();
    });
  });
});
