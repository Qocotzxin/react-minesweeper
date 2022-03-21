import { Server, WebSocket } from "mock-websocket";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { startGame } from "../features/Game/gameSlice";
import { resetFlags, selectCoordinates } from "../features/Tiles/tileSlice";
import socketClient from "../services/SocketClient";
import {
  createSocketChannel,
  handleCoordinatesSelection,
  handleGetMap,
  handleStartGame,
  watchCoordinatesSelection,
  watchSocketMessages,
  watchStartGame,
} from "./sagas";

const serverURL = "wss://hometask.eg1236.com/game1/";
let mockServer: Server;

beforeEach(() => {
  mockServer = new Server(serverURL);
});

afterEach(() => {
  mockServer.close();
});

describe("Sagas", () => {
  describe("handleGetMap", () => {
    it('Should call socket.send with "map" as argument', () => {
      const socket = new WebSocket(serverURL);
      // @ts-ignore
      const gen = handleGetMap(socket);
      expect(gen.next().value).toEqual(
        call({ context: socket, fn: socket.send }, "map")
      );
    });
  });

  describe("handleStartGame", () => {
    it('Should call socket.send with "map" as argument', () => {
      const gen = handleStartGame({ payload: 1, type: "string" });
      expect(gen.next().value).toEqual(
        call({ context: socketClient, fn: socketClient.send }, `new 1`)
      );
      expect(gen.next().value).toEqual(put(resetFlags()));
    });
  });

  describe("handleCoordinatesSelection", () => {
    it('Should call socket.send with "map" as argument', () => {
      const gen = handleCoordinatesSelection({
        payload: { x: 1, y: 1 },
        type: "string",
      });
      expect(gen.next().value).toEqual(
        call({ context: socketClient, fn: socketClient.send }, `open 1 1`)
      );
    });
  });

  describe("Socket channel", () => {
    it("Should add event listeners to the socket.", () => {
      const socket = new WebSocket(serverURL);
      const spy = jest.spyOn(socket, "addEventListener");
      // @ts-ignore
      createSocketChannel(socket);
      expect(spy).toHaveBeenCalledTimes(4);
    });
  });

  describe("watchStartGame", () => {
    it("Should call handleStartGame using takeLatest helper.", () => {
      const gen = watchStartGame();
      expect(gen.next().value).toEqual(
        takeLatest(startGame.type, handleStartGame)
      );
    });
  });

  describe("watchCoordinatesSelection", () => {
    it("Should call handleCoordinatesSelection using takeEvery helper.", () => {
      const gen = watchCoordinatesSelection();
      expect(gen.next().value).toEqual(
        takeEvery(selectCoordinates.type, handleCoordinatesSelection)
      );
    });
  });

  describe("watchSocketMessages", () => {
    it("Should call createSocketChannel.", () => {
      const socket = new WebSocket(serverURL);
      // @ts-ignore
      const gen = watchSocketMessages(socket);
      // @ts-ignore
      expect(gen.next().value).toEqual(call(createSocketChannel, socket));
    });
  });
});
