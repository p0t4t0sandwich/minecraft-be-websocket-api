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
    // Ignore messages from the websocket server
    if (event.body.sender == "Teacher") return

    // Rename command
    if (event.body.message.startsWith("!rename")) {
        const playerName: string = event.body.sender;
        const newName: string = event.body.message.split(" ")[1];

        await mwss.sendCommand(event.server, `tag "${playerName}" add "${newName}"`);

        await mwss.sendCommand(event.server, `tag "${playerName}" list`);
    }
});

// Start the websocket server
await mwss.start();
