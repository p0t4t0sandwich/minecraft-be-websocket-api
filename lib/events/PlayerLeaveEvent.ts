import { Player } from "../game/Player.js";
import { BedrockEvent, EventBody } from "./BedrockEvent.js";

// PlayerLeaveEvent
interface PlayerLeaveBody extends EventBody {
    player: Player;
}

class PlayerLeaveEvent extends BedrockEvent {
    // Properties
    body: PlayerLeaveBody;

    // Constructor
    constructor(event: BedrockEvent) {
        super(event.getServer(), event.getHeader(), event.getBody());
    }

    // Getters
    getBody(): PlayerLeaveBody {
        return this.body;
    }

    getPlayer(): Player {
        return this.body.player;
    }
}

export { PlayerLeaveBody, PlayerLeaveEvent }
