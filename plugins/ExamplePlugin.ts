// ExamplePlugin
// { eventName: EventName, callback: (event: BedrockEvent) => void) }

import { mwss } from "../index.js";
import { BedrockEvent, EventName, PlayerMessageEvent } from "../lib/events/Events.js";
import { Listener } from "../lib/listeners/Listeners.js";

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
    },
    {
        eventName: EventName.ItemNamed, // Might not work
        callback: async (event: BedrockEvent) => {
            console.log(EventName.ItemNamed);
            console.log(event);
        }
    },
    {
        eventName: EventName.ItemUsed,
        callback: async (event: BedrockEvent) => {
            // console.log(EventName.ItemUsed);
            // console.log(event);
        }
    },
    {
        eventName: EventName.PlayerTransform,
        callback: async (event: BedrockEvent) => {
            // console.log(EventName.PlayerTransform);
            // console.log(event);
        }
    }
]