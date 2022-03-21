import { Message, Piece } from "../../enum";
import tileReducer, {
  selectCoordinates,
  updateFlaggedTiles,
  resetFlags,
} from "./tileSlice";

describe("Game reducer", () => {
  it("Should return the initial state.", () => {
    expect(tileReducer(undefined, { type: "" })).toEqual({
      availableFlags: 10,
      flaggedTiles: [],
    });
  });

  it("Should not modify any state when selectCoordinates is called.", () => {
    const previousState = {
      availableFlags: 10,
      flaggedTiles: [],
    };

    expect(
      tileReducer(previousState, selectCoordinates({ x: 1, y: 1 }))
    ).toEqual({
      availableFlags: 10,
      flaggedTiles: [],
    });
  });

  it("Should set availableFlags back to 10 and empty flaggedTiles when resetFlags is called.", () => {
    const previousState = {
      availableFlags: 5,
      flaggedTiles: [{ x: 1, y: 1 }],
    };

    expect(tileReducer(previousState, resetFlags())).toEqual({
      availableFlags: 10,
      flaggedTiles: [],
    });
  });

  it("Should not modify any state if no more flags are available and updateFlaggedTiles is called with a new tile coordinate.", () => {
    const previousState = {
      availableFlags: 0,
      flaggedTiles: [{ x: 1, y: 1 }],
    };

    expect(
      tileReducer(previousState, updateFlaggedTiles({ x: 2, y: 2 }))
    ).toEqual({
      availableFlags: 0,
      flaggedTiles: [{ x: 1, y: 1 }],
    });
  });

  it("Should reduce the amount of availableFlags and add the new tile coordinates to flaggedTiles when updateFlaggedTiles is called with a new tile coordinate.", () => {
    const previousState = {
      availableFlags: 9,
      flaggedTiles: [{ x: 1, y: 1 }],
    };

    expect(
      tileReducer(previousState, updateFlaggedTiles({ x: 2, y: 2 }))
    ).toEqual({
      availableFlags: 8,
      flaggedTiles: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ],
    });
  });

  it("Should remove the tile coordinates from flaggedTiles and increase availableFlags when updateFlaggedTiles is called with an existent tile coordinate.", () => {
    const previousState = {
      availableFlags: 9,
      flaggedTiles: [{ x: 1, y: 1 }],
    };

    expect(
      tileReducer(previousState, updateFlaggedTiles({ x: 1, y: 1 }))
    ).toEqual({
      availableFlags: 10,
      flaggedTiles: [],
    });
  });
});
