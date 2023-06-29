// ExamplePlugin
// { eventName: EventName, callback: (event: BedrockEvent) => void) }

import { BedrockServer } from "../lib/BedrockServer.js";
import { MinecraftWebSocket } from "../lib/MinecraftWebSocket.js";
import { Plugin } from "../lib/Plugin.js";
import { BedrockEvent, EventName } from "../lib/events/BedrockEvent.js";
import { PlayerMessageEvent } from "../lib/events/PlayerMessageEvent.js";

export class ExamplePlugin extends Plugin {
    // Constructor
    constructor() {
        // Set plugin info
        super(
            "Example Plugin",
            "An example plugin for MWSS.",
            "1.0.0",
            "p0t4t0sandwich"
        );

        // Set listeners
        this.setListeners([
            {
                eventName: EventName.PlayerMessage,
                callback: async (event: PlayerMessageEvent) => {
                    const playerName: string = event.body.sender;
                    const message: string = event.body.message;
                    const server: BedrockServer = this.mwss.getServer(event.server);
        
                    // Ignore messages from the websocket server
                    if (event.body.sender == "Teacher") return
        
                    await server.sendCommand(`say ${playerName} said ${message}`);
                }
            },
            {
                eventName: EventName.StartWorld,
                callback: async (event: BedrockEvent) => {
                    const server: BedrockServer = this.mwss.getServer(event.server);
        
                    console.log(event.body);
                    console.log(event.header);
        
                    await server.unsubscribeFromEvent(EventName.StartWorld);
                }
            },
            {
                eventName: EventName.WorldGenerated,
                callback: async (event: BedrockEvent) => {
                    const server: BedrockServer = this.mwss.getServer(event.server);
        
                    console.log(event.body);
                    console.log(event.header);
        
                    await server.unsubscribeFromEvent(EventName.WorldGenerated);
                }
            },
            {
                eventName: EventName.WorldLoaded,
                callback: async (event: BedrockEvent) => {
                    const server: BedrockServer = this.mwss.getServer(event.server);
        
                    console.log(event.body);
                    console.log(event.header);
        
                    await server.unsubscribeFromEvent(EventName.WorldLoaded);
                }
            },
            {
                eventName: EventName.WorldUnloaded,
                callback: async (event: BedrockEvent) => {
                    const server: BedrockServer = this.mwss.getServer(event.server);
        
                    console.log(event.body);
                    console.log(event.header);
        
                    await server.unsubscribeFromEvent(EventName.WorldUnloaded);
                }
            }
        ]);
    }

    // Methods

    // Start
    async start(mwss: MinecraftWebSocket) {
        this.mwss = mwss;
        console.log("Example plugin started!");
    }
}