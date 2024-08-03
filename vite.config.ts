import { sveltekit } from "@sveltejs/kit/vite";
import type { PluginOption } from "vite";
import glsl from "vite-plugin-glsl";
import { defineConfig } from "vitest/config";

import { webSocketServerVitePlugin } from "./src/lib/server/modules/web-socket-server/web-socket-server-vite-plugin.js";

const reloadEverything: PluginOption = {
  handleHotUpdate: ({ server }) => {
    server.restart().then(() => server.hot.send({ type: "full-reload" }));

    return [];
  },

  name: "reload-everything",
};

export default defineConfig({
  plugins: [sveltekit(), webSocketServerVitePlugin, glsl(), reloadEverything],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
