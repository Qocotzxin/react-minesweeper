import { selectCoordinates } from "../Tiles/tileSlice";
import { Message, Piece } from "../../enum";
import gameReducer, {
  confirmSocketIsReady,
  startGame,
  updateBoard,
  updateMessage,
} from "./gameSlice";

describe("Game reducer", () => {
  it("Should return the initial state.", () => {
    expect(gameReducer(undefined, { type: "" })).toEqual({
      map: [],
      isReady: false,
      message: Message.ok,
      isLoadingBoard: false,
      difficulty: 1,
    });
  });

  it("Should update isLoadingBoard, message and difficulty states after startGame is called.", () => {
    const previousState = {
      map: [],
      isReady: false,
      message: Message.lose,
      isLoadingBoard: false,
      difficulty: 1,
    };

    expect(gameReducer(previousState, startGame(2))).toEqual({
      map: [],
      isReady: false,
      message: Message.ok,
      isLoadingBoard: true,
      difficulty: 2,
    });
  });

  it("Should set difficulty state to 1 if no difficulty was sent.", () => {
    const previousState = {
      map: [],
      isReady: false,
      message: Message.lose,
      isLoadingBoard: false,
      difficulty: 1,
    };

    expect(gameReducer(previousState, startGame(null))).toEqual({
      map: [],
      isReady: false,
      message: Message.ok,
      isLoadingBoard: true,
      difficulty: 1,
    });
  });

  it("Should update map and isLoadingBoard states when updateBoard is called.", () => {
    const previousState = {
      map: [],
      isReady: false,
      message: Message.ok,
      isLoadingBoard: true,
      difficulty: 1,
    };

    expect(
      gameReducer(previousState, updateBoard(`map:\n${Piece.uncovered}`))
    ).toEqual({
      map: [`${Piece.uncovered}`],
      isReady: false,
      message: Message.ok,
      isLoadingBoard: false,
      difficulty: 1,
    });
  });

  it("Should update only map state when updateBoard is called and isLoadingBoard previous state is false.", () => {
    const previousState = {
      map: [],
      isReady: false,
      message: Message.ok,
      isLoadingBoard: false,
      difficulty: 1,
    };

    expect(
      gameReducer(previousState, updateBoard(`map:\n${Piece.uncovered}`))
    ).toEqual({
      map: [`${Piece.uncovered}`],
      isReady: false,
      message: Message.ok,
      isLoadingBoard: false,
      difficulty: 1,
    });
  });

  it("Should update message state when updateMessage is called.", () => {
    const previousState = {
      map: [],
      isReady: false,
      message: Message.ok,
      isLoadingBoard: false,
      difficulty: 1,
    };

    expect(
      gameReducer(previousState, updateMessage(`open: ${Message.win}`))
    ).toEqual({
      map: [],
      isReady: false,
      message: Message.win,
      isLoadingBoard: false,
      difficulty: 1,
    });
  });

  it("Should not modify any state when selectCoordinates is called.", () => {
    const previousState = {
      map: [],
      isReady: false,
      message: Message.ok,
      isLoadingBoard: false,
      difficulty: 1,
    };

    expect(
      gameReducer(previousState, selectCoordinates({ x: 1, y: 1 }))
    ).toEqual({
      map: [],
      isReady: false,
      message: Message.ok,
      isLoadingBoard: false,
      difficulty: 1,
    });
  });

  it("Should modify isReady state when confirmSocketIsReady is called.", () => {
    const previousState = {
      map: [],
      isReady: false,
      message: Message.ok,
      isLoadingBoard: false,
      difficulty: 1,
    };

    expect(gameReducer(previousState, confirmSocketIsReady())).toEqual({
      map: [],
      isReady: true,
      message: Message.ok,
      isLoadingBoard: false,
      difficulty: 1,
    });
  });
});
