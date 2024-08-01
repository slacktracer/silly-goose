import type { WebSocketPlusSocketID } from "../web-socket-server/types/WebSocketPlusSocketID.js";
import type { WebSocketServerOnMessageHandlerParameter } from "../web-socket-server/types/WebSocketServerOnMessageHandlerParameter.js";

const broadcast = ({
  data,
  webSocket,
  webSocketServer,
}: WebSocketServerOnMessageHandlerParameter) => {
  webSocketServer.clients.forEach((socket: WebSocketPlusSocketID) => {
    if (webSocket.socketID !== socket.socketID) {
      socket.send(JSON.stringify(data));
    }
  });
};

export const webSocketServerOnMessageHandlers = {
  broadcast,
};
