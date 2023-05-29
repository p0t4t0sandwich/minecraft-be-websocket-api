import { WebSocketServer } from "ws";


import { BedrockServer } from "./BedrockServer.js";
import { PlayerMessageEvent } from "./Events.js";


export class MinecraftWebSocket {
    // Parameters
    public wss: WebSocketServer;
    private servers: any = {};

    constructor(wss: WebSocketServer) {
        this.wss = wss;
    }

    async onConnection(ws, req) {
        var url = req.url;
        var userID = url.slice(1);
        this.servers[userID] = new BedrockServer(userID, ws);
        console.log('Connected: ' + userID);

        ws.on('close', () => {
            delete this.servers[userID]
            console.log('Disconnected: ' + userID)
        });

        this.servers[userID].onPlayerMessage(async (res: PlayerMessageEvent) => {
            // Ignore messages from the websocket server
            if (res.body.sender == "Teacher") return

            await this.servers[userID].sendCommand(`tellraw @a {"rawtext":[{"text":"${res.body.sender} said: ${res.body.message}"}]}`);
        });
    }

    async start() {
        this.wss.on('connection', this.onConnection.bind(this));
    }
}