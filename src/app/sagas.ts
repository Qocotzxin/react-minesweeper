import { END, EventChannel, eventChannel } from "redux-saga";
import {
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import socketClient from "../services/SocketClient";
import { Coordinates, WebSocketEvent } from "../types";
import {
  startGame,
  updateBoard,
  selectCoordinates,
  confirmSocketIsReady,
  updateMessage,
} from "../features/Game/gameSlice";
import { PayloadAction } from "@reduxjs/toolkit";

/**
 * Creates event channel from socket and setup listeners.
 */
export function createSocketChannel(
  socket: WebSocket
): EventChannel<string | END> {
  return eventChannel((emit) => {
    const handleOpen = () => emit("READY");

    const handleMessage = (event: WebSocketEvent) => {
      emit(event.data);
    };

    const handleError = (error: Event) => {
      emit(error as END);
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);
    socket.addEventListener("error", handleError);

    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("error", handleError);
    };
  });
}

/**
 * Sends a socket message to retrieve the udpated map.
 */
export function* handleGetMap(socket: WebSocket) {
  yield call({ context: socket, fn: socket.send }, "map");
}

/**
 * Sends a socket message to start a new game with the specified difficulty.
 */
export function* handleStartGame(action: PayloadAction<number | null>) {
  const socket = socketClient;
  yield call(
    { context: socket, fn: socket.send },
    `new ${action.payload || 1}`
  );
}

/**
 * Sends a socket message to uncover a specific grid block.
 */
export function* handleCoordinatesSelection(
  action: PayloadAction<Coordinates>
) {
  const socket = socketClient;
  const { x, y } = action.payload;
  yield call({ context: socket, fn: socket.send }, `open ${x} ${y}`);
}

// Watchers sagas.

/**
 * Watch start game event triggered by the user.
 */
export function* watchStartGame() {
  yield takeLatest(startGame.type, handleStartGame);
}

/**
 * Lstens coodrindate selection event from user.
 */
export function* watchCoordinatesSelection() {
  yield takeEvery(selectCoordinates.type, handleCoordinatesSelection);
}

/**
 * Watch for socket messages
 */
export function* watchSocketMessages(socket: WebSocket) {
  const socketChannel: EventChannel<string | END> = yield call(
    createSocketChannel,
    socket
  );

  while (true) {
    try {
      const data: string = yield take(socketChannel);

      if (data === "READY") {
        yield put(confirmSocketIsReady());
      }

      if (data.includes("map:")) {
        yield put(updateBoard(data));
      }

      if (data.includes("new:")) {
        yield fork(handleGetMap, socket);
      }

      if (data.includes("open")) {
        yield fork(handleGetMap, socket);
        yield put(updateMessage(data));
      }
    } catch (err) {
      socketChannel.close();
    }
  }
}

export default function* rootSaga() {
  yield all([
    watchSocketMessages(socketClient),
    watchStartGame(),
    watchCoordinatesSelection(),
  ]);
}
