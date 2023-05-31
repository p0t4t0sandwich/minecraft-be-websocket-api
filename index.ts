import { MinecraftWebSocket } from "./lib/MinecraftWebSocket.js";


// Web Sockets
const WEBSOCKET_PORT: number = <number><unknown>process.env.WEBSOCKET_PORT || 4005;

// Minecraft Web Socket
export const mwss: MinecraftWebSocket = new MinecraftWebSocket(WEBSOCKET_PORT);

// Import listeners from ./plugins
await mwss.loadPlugins('./plugins');
