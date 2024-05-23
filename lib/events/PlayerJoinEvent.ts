import { Player } from "../game/Player.js";
import { BedrockEvent, EventBody } from "./BedrockEvent.js";

// PlayerJoinEvent
interface PlayerJoinBody extends EventBody {
  player: Player;
}

class PlayerJoinEvent extends BedrockEvent {
  // Properties
  body: PlayerJoinBody;

  // Constructor
  constructor(event: BedrockEvent) {
    super(event.getServer(), event.getHeader(), event.getBody());
  }

  // Getters
  getBody(): PlayerJoinBody {
    return this.body;
  }

  getPlayer(): Player {
    return this.body.player;
  }
}

export { PlayerJoinBody, PlayerJoinEvent };
