import { Player } from "../game/Player.js";
import { BedrockEvent, EventBody } from "./BedrockEvent.js";

// PlayerTransformEvent
interface PlayerTransformBody extends EventBody {
    player: Player;
}

class PlayerTransformEvent extends BedrockEvent {
    // Properties
    body: PlayerTransformBody;

    // Constructor
    constructor(event: BedrockEvent) {
        super(event.getServer(), event.getHeader(), event.getBody());
    }

    // Getters
    getBody(): PlayerTransformBody {
        return this.body;
    }

    getPlayer(): Player {
        return this.body.player;
    }
}

export { PlayerTransformBody, PlayerTransformEvent }
