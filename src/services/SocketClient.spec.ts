import socketClient from "./SocketClient";

describe("socketClient", () => {
  it("Should export a socket instance", () => {
    expect(socketClient instanceof WebSocket).toBe(true);
  });
});
