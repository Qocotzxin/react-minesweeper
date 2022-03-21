import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinates } from "../../types";

export interface TileState {
  availableFlags: number;
  flaggedTiles: Coordinates[];
}

const initialState: TileState = {
  availableFlags: 10,
  flaggedTiles: [],
};

export const tileSlice = createSlice({
  name: "tile",
  initialState,
  reducers: {
    updateFlaggedTiles(state, action: PayloadAction<Coordinates>) {
      const exists = state.flaggedTiles.find((tile) => {
        return tile.x === action.payload.x && tile.y === action.payload.y;
      });
      if (!exists) {
        if (state.availableFlags <= 0) {
          return;
        }
        state.flaggedTiles.push(action.payload);
        state.availableFlags -= 1;
      } else {
        const updateFlaggedTiles = state.flaggedTiles.findIndex(
          (tile) => tile.x === action.payload.x && tile.y === action.payload.y
        );
        state.flaggedTiles.splice(updateFlaggedTiles, 1);
        state.availableFlags += 1;
      }
    },
    selectCoordinates(state, action: PayloadAction<Coordinates>) {},
    resetFlags(state) {
      state.availableFlags = 10;
      state.flaggedTiles = [];
    },
  },
});

export const { selectCoordinates, updateFlaggedTiles, resetFlags } =
  tileSlice.actions;

export default tileSlice.reducer;
