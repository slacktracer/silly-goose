<script lang="ts">
  import { onMount } from "svelte";

  import { connectToWebSocketServer } from "../core/connect-to-web-socket-server.js";
  import { getMainEventBus } from "../core/get-main-event-bus.js";

  let ws: WebSocket;

  onMount(() => {
    const mainEventBus = getMainEventBus();

    const websocket = connectToWebSocketServer({ eventBus: mainEventBus });

    ws = websocket;

    console.log(ws);
  });
</script>

sg goes here again
