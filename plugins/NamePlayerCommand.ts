// NamePlayerCommand
// Author: p0t4t0sandwich
// Description: This plugin will allow players to set a custom name for themselves (Displayed below their in-game name).

import { mwss } from "../index.js";
import { EventName, PlayerMessageEvent } from "../lib/events/Events.js";
import { Listener } from "../lib/listeners/Listeners.js";

export const listeners: Listener[] = [
    {
        eventName: EventName.PlayerMessage,
        callback: async (event: PlayerMessageEvent) => {
            const playerName: string = event.body.sender;
            const message: string = event.body.message;

            // Ignore messages from the websocket server
            if (event.body.sender == "Teacher") return

            if (message.startsWith("!name ")) {
                const name: string = message.split(" ")[1];

                // Announce name change
                await mwss.sendCommand(event.server, `say ${playerName} changed their name to ${name}`);

                // Add name objective
                await mwss.sendCommand(event.server, `scoreboard objectives add ${name} dummy "${name}"`);

                // Set display below name
                await mwss.sendCommand(event.server, `scoreboard objectives setdisplay belowname ${name}`);

                // Set name score to 0
                await mwss.sendCommand(event.server, `scoreboard players set ${playerName} ${name} 0`);
            }
        }
    }
];