// ExamplePlugin
// { eventName: EventName, callback: (event: BedrockEvent) => void) }

import { mwss } from "../index.js";
import { BedrockServer } from "../lib/BedrockServer.js";
import { BedrockEvent, EventName, PlayerMessageEvent } from "../lib/events/Events.js";
import { Listener } from "../lib/listeners/Listeners.js";

export const listeners: Listener[] = [
    {
        eventName: EventName.PlayerMessage,
        callback: async (event: PlayerMessageEvent) => {
            const playerName: string = event.body.sender;
            const message: string = event.body.message;
            const server: BedrockServer = mwss.getServer(event.server);

            // Ignore messages from the websocket server
            if (event.body.sender == "Teacher") return

            await server.sendCommand(`say ${playerName} said ${message}`);
        }
    },
    {
        eventName: EventName.PlayerJoin,
        callback: async (event: BedrockEvent) => {
            console.log(EventName.PlayerJoin);
            console.log(event);
            const server: BedrockServer = mwss.getServer(event.server);

            await server.sendCommand(`say ${event.body.player} joined the game`);
            await server.unsubscribeFromEvent(EventName.PlayerJoin);
        }
    },
    {
        eventName: EventName.PlayerLeave,
        callback: async (event: BedrockEvent) => {
            console.log(EventName.PlayerLeave);
            console.log(event);
            const server: BedrockServer = mwss.getServer(event.server);

            await server.sendCommand(`say ${event.body.player} left the game`);
            await server.unsubscribeFromEvent(EventName.PlayerLeave);
        }
    }
]