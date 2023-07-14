import { MinecraftWebSocket } from "./lib/MinecraftWebSocket.js";

// Import internal plugins
import { PlayerCachePlugin } from "./lib/api/plugins/PlayerCachePlugin/PlayerCachePlugin.js";

// Import plugins
import { ExamplePlugin } from "./plugins/ExamplePlugin/ExamplePlugin.js";

async function main() {
    // Minecraft Web Socket
    const WEBSOCKET_PORT: number = <number><unknown>process.env.WEBSOCKET_PORT || 4005;
    const mwss: MinecraftWebSocket = new MinecraftWebSocket(WEBSOCKET_PORT);

    // Minecraft REST API
    const REST_PORT: number = <number><unknown>process.env.REST_PORT || 4006;
    mwss.startRestServer(REST_PORT);

    // Load internal plugins
    await mwss.loadPlugin(new PlayerCachePlugin());

    // Load plugins
    await mwss.loadPlugin(new ExamplePlugin());
}
main();
