import { WebSocketServer } from "ws";


import { MinecraftWebSocket } from "./lib/MinecraftWebSocket.js";
import { EventName, PlayerMessageEvent } from "./lib/Events.js";


// Web Sockets
const WEBSOCKET_PORT: number = <number><unknown>process.env.WEBSOCKET_PORT || 4005;

export const wss: WebSocketServer = new WebSocketServer({ port: WEBSOCKET_PORT }, () => {
    console.log(`MC BE Management Web Socket running on port ${WEBSOCKET_PORT}`);
});


// Minecraft Web Socket
const mwss: MinecraftWebSocket = new MinecraftWebSocket(wss);

// Add PlayerMessage Event listener
await mwss.on(EventName.PlayerMessage, async (event: PlayerMessageEvent) => {
    console.log("PlayerMessageEvent received: ", event);

    // Ignore messages from the websocket server
    if (event.body.sender == "Teacher") return

    await mwss.sendCommand(event.server, `tellraw @a {"rawtext":[{"text":"${event.body.sender} said: ${event.body.message}"}]}`);
});

await mwss.start();
