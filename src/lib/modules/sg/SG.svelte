<script lang="ts">
  import { onMount } from "svelte";

  import { connectToWebSocketServer } from "../core/connect-to-web-socket-server.js";
  import { mainEventBus } from "../core/main-event-bus";

  let ws: WebSocket;

  onMount(() => {
    if (mainEventBus) {
      const websocket = connectToWebSocketServer({ eventBus: mainEventBus });

      ws = websocket;

      console.log(ws);
    }
  });
</script>

sg goes here again
