import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../enum";

export interface GameState {
  map: string[];
  isReady: boolean;
  message: Message;
  isLoadingBoard: boolean;
  difficulty: number;
}

const initialState: GameState = {
  map: [],
  isReady: false,
  message: Message.ok,
  isLoadingBoard: false,
  difficulty: 1,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<number | null>) {
      state.isLoadingBoard = true;
      state.message = Message.ok;
      state.difficulty = action.payload || 1;
    },
    updateBoard(state, action: PayloadAction<string>) {
      if (state.isLoadingBoard) {
        state.isLoadingBoard = false;
      }
      state.map = action.payload.split("map:")[1].split("\n").filter(Boolean);
    },
    updateMessage(state, action: PayloadAction<string>) {
      state.message = action.payload.split("open:")[1].trim() as Message;
    },
    confirmSocketIsReady(state) {
      state.isReady = true;
    },
  },
});

export const { startGame, updateBoard, confirmSocketIsReady, updateMessage } =
  gameSlice.actions;

export default gameSlice.reducer;
