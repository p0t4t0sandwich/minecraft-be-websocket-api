import { MinecraftWebSocket } from "./lib/MinecraftWebSocket.js";


// Web Socket Port
const WEBSOCKET_PORT: number = <number><unknown>process.env.WEBSOCKET_PORT || 4005;

// Minecraft Web Socket
export const mwss: MinecraftWebSocket = new MinecraftWebSocket(WEBSOCKET_PORT);

// Import listeners from plugin
import { listeners as example } from "./plugins/ExamplePlugin.js";
await mwss.loadListeners(example);

import { listeners as namePlayerCommand } from "./plugins/NamePlayerCommand.js";
await mwss.loadListeners(namePlayerCommand);
