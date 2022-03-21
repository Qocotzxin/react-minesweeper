import { fireEvent, render, screen } from "@testing-library/react";
import { DefaultTile } from "./DefaultTile";
import { configureStore } from "@reduxjs/toolkit";
import * as tiles from "../tileSlice";
import { Provider } from "react-redux";
import { FC } from "react";
import tileReducer from "../tileSlice";

const DefaultTileMockProps = {
  colIndex: 1,
  rowIndex: 2,
  disabled: false,
};

afterAll(() => {
  jest.resetAllMocks();
});

interface WrapperProps {
  preloadedState?: tiles.TileState;
  disabled?: boolean;
}

const defaultState = {
  availableFlags: 10,
  flaggedTiles: [],
};

const Wrapper: FC<WrapperProps> = ({
  preloadedState = defaultState,
  disabled,
}) => {
  return (
    <Provider
      store={configureStore({
        reducer: { tile: tileReducer },
        preloadedState: { tile: preloadedState },
      })}
    >
      <DefaultTile {...DefaultTileMockProps} disabled={disabled} />
    </Provider>
  );
};

describe("DefaultTile", () => {
  describe("Snapshot", () => {
    it("Should render correctly and match snapshot.", () => {
      const { container } = render(<Wrapper />);

      expect(container).toMatchSnapshot();
    });
  });

  describe("Behavior", () => {
    it("Should call selectCoordinates with the right coordinates when tile is clicked.", () => {
      render(<Wrapper />);
      const spySelectCoordinates = jest.spyOn(tiles, "selectCoordinates");
      const spyUpdateFlaggedTiles = jest.spyOn(tiles, "updateFlaggedTiles");

      fireEvent.click(screen.getByTestId("DefaultTile"));

      expect(spySelectCoordinates).toHaveBeenCalledTimes(1);
      expect(spySelectCoordinates).toHaveBeenCalledWith({ x: 1, y: 2 });
      expect(spyUpdateFlaggedTiles).not.toHaveBeenCalled();
      spySelectCoordinates.mockClear();
      spyUpdateFlaggedTiles.mockClear();
    });

    it("Should call selectCoordinates with the right coordinates when ENTER key is pressed on a tile.", () => {
      render(<Wrapper />);
      const spySelectCoordinates = jest.spyOn(tiles, "selectCoordinates");
      const spyUpdateFlaggedTiles = jest.spyOn(tiles, "updateFlaggedTiles");

      fireEvent.keyUp(screen.getByTestId("DefaultTile"), { key: "Enter" });

      expect(spySelectCoordinates).toHaveBeenCalledTimes(1);
      expect(spySelectCoordinates).toHaveBeenCalledWith({ x: 1, y: 2 });
      expect(spyUpdateFlaggedTiles).not.toHaveBeenCalled();
      spySelectCoordinates.mockClear();
      spyUpdateFlaggedTiles.mockClear();
    });

    it("Should NOT call selectCoordinates when other key than ENTER is pressed on a tile.", () => {
      render(<Wrapper />);
      const spySelectCoordinates = jest.spyOn(tiles, "selectCoordinates");
      const spyUpdateFlaggedTiles = jest.spyOn(tiles, "updateFlaggedTiles");

      fireEvent.keyUp(screen.getByTestId("DefaultTile"), { key: "Tab" });

      expect(spySelectCoordinates).not.toHaveBeenCalled();
      expect(spyUpdateFlaggedTiles).not.toHaveBeenCalled();

      spySelectCoordinates.mockClear();
      spyUpdateFlaggedTiles.mockClear();
    });

    it("Should call updateFlaggedTiles with the right coordinates when tile is clicked and its already flagged.", () => {
      const preloadedState = {
        availableFlags: 9,
        flaggedTiles: [{ x: 1, y: 2 }],
      };
      render(<Wrapper preloadedState={preloadedState} />);
      const spy = jest.spyOn(tiles, "updateFlaggedTiles");

      fireEvent.click(screen.getByTestId("DefaultTile"));

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ x: 1, y: 2 });
      spy.mockClear();
    });

    it("Should call updateFlaggedTiles with the right coordinates when tile is right clicked.", () => {
      render(<Wrapper />);
      const spy = jest.spyOn(tiles, "updateFlaggedTiles");

      fireEvent.contextMenu(screen.getByTestId("DefaultTile"));

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ x: 1, y: 2 });
      spy.mockClear();
    });

    it("Should display a spinner when the button is clicked.", () => {
      render(<Wrapper />);

      fireEvent.click(screen.getByTestId("DefaultTile"));

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("Should set pointerEvents to none when the button is disabled.", () => {
      render(<Wrapper disabled />);

      expect(screen.getByTestId("DefaultTile")).toHaveStyle({
        pointerEvents: "none",
      });
    });

    it("Should add a flag if available when right clicking on element.", () => {
      render(<Wrapper disabled />);

      fireEvent.contextMenu(screen.getByTestId("DefaultTile"));

      expect(screen.getByTestId("DefaultTile-flag")).toBeInTheDocument();
    });
  });
});
