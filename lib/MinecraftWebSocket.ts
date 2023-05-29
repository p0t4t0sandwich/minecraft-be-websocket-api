import { WebSocket, WebSocketServer } from "ws";


import { BedrockServer } from "./BedrockServer.js";
import { BedrockEvent, EventName } from "./Events.js";


export class MinecraftWebSocket {
    // Parameters
    public wss: WebSocketServer;
    private eventListeners: any[] = [];
    private servers: any = {};

    constructor(wss: WebSocketServer) {
        this.wss = wss;
    }

    async onConnection(ws: WebSocket, req) {
        var url = req.url;
        var userID = url.slice(1);
        this.servers[userID] = new BedrockServer(userID, ws);
        console.log('Connected: ' + userID);

        // Subscribe to events
        for (var eventListener in this.eventListeners) {
            await this.servers[userID].subscribeToEvent(
                this.eventListeners[eventListener].eventName,
                this.eventListeners[eventListener].callback
            );
        }

        ws.on('close', () => {
            delete this.servers[userID]
            console.log('Disconnected: ' + userID)
        });
    }

    // Event listener
    async on(eventName: EventName, callback: (event: BedrockEvent) => void) {
        this.eventListeners.push({ eventName: eventName, callback: callback })
    }

    async sendCommand(server: string, command: string) {
        return await this.servers[server].sendCommand(command);
    }

    // Start the websocket server
    async start() {
        this.wss.on('connection', this.onConnection.bind(this));
    }
}