import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from 'uuid';


import { MinecraftWebSocket } from "./lib/MinecraftWebSocket.js";


// Web Sockets
let webSockets = {};
let subscribeEvents = {};

const WEBSOCKET_PORT: number = <number><unknown>process.env.WEBSOCKET_PORT || 4005;

export const wss: WebSocketServer = new WebSocketServer({ port: WEBSOCKET_PORT }, () => {
    console.log(`MC BE Management Web Socket running on port ${WEBSOCKET_PORT}`);
});

const mwss: MinecraftWebSocket = new MinecraftWebSocket(wss);
await mwss.start();
