// ExamplePlugin
// { eventName: EventName, callback: (event: BedrockEvent) => void) }

import { mwss } from "../index.js";
import { EventName, PlayerMessageEvent } from "../lib/Events.js";
import { Listener } from "../lib/Listeners.js";

export const listeners: Listener[] = [
    {
        eventName: EventName.PlayerMessage,
        callback: async (event: PlayerMessageEvent) => {
            const playerName: string = event.body.sender;
            const message: string = event.body.message;

            // Ignore messages from the websocket server
            if (event.body.sender == "Teacher") return

            await mwss.sendCommand(event.server, `say ${playerName} said ${message}`);
        }
    }
]