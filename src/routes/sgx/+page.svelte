<script lang="ts">
  import { browser } from "$app/environment";

  import { connectToWebSocketServer } from "../../modules/core/connect-to-web-socket-server.js";
  import { mainEventBus } from "../../modules/core/main-event-bus";

  let ws: WebSocket;

  if (browser && mainEventBus) {
    const websocket = connectToWebSocketServer({ eventBus: mainEventBus });

    ws = websocket;

    console.log(ws);
  }
</script>

sgx goes here
