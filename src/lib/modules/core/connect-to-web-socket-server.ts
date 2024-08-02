import type { EventBus } from "../types/EventBus";

let openingWebSocket = false;
let webSocket: WebSocket | null = null;
let webSocketEstablished = false;

export const connectToWebSocketServer = ({
  eventBus,
}: { eventBus?: EventBus } = {}) => {
  if (typeof window === "undefined") {
    return;
  }

  if (openingWebSocket) {
    return webSocket;
  }

  openingWebSocket = true;

  if (webSocketEstablished) {
    return webSocket;
  }

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

  webSocket = new WebSocket(`${protocol}//${window.location.host}/connect`);

  webSocket.addEventListener("open", (event) => {
    webSocketEstablished = true;

    openingWebSocket = false;

    console.log("[webSocket] connection open", event);
  });

  webSocket.addEventListener("close", (event) => {
    console.log("[webSocket] connection closed", event);
  });

  webSocket.addEventListener("message", (event) => {
    const parsedData = JSON.parse(event?.data);

    eventBus?.emit(parsedData.type, parsedData);
  });

  return webSocket;
};
