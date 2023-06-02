import { MinecraftWebSocket } from "./lib/MinecraftWebSocket.js";

// Import Plugins
import { ExamplePlugin } from "./plugins/ExamplePlugin.js";
import { NamePlayerCommand } from "./testPlugins/NamePlayerCommand.js";

async function main() {
    // Web Socket Port
    const WEBSOCKET_PORT: number = <number><unknown>process.env.WEBSOCKET_PORT || 4005;

    // Minecraft Web Socket
    const mwss: MinecraftWebSocket = new MinecraftWebSocket(WEBSOCKET_PORT);

    // Rest Port
    const REST_PORT: number = <number><unknown>process.env.REST_PORT || 4006;
    await mwss.startRestServer(REST_PORT);

    // Load plugins
    await mwss.loadPlugin(new ExamplePlugin());
    await mwss.loadPlugin(new NamePlayerCommand());
}
main();
