import { Block } from "../game/Block.js";
import { Player } from "../game/Player.js";
import { Tool } from "../game/Tool.js";
import { BedrockEvent, EventBody } from "./BedrockEvent.js";

// BlockPlacedEvent
interface BlockPlacedBody extends EventBody {
    block: Block,
    count: number,
    placedUnderwater: boolean,
    placementMethod: number,
    player: Player,
    tool: Tool
}

class BlockPlacedEvent extends BedrockEvent {
    // Properties
    body: BlockPlacedBody;

    // Constructor
    constructor(event: BedrockEvent) {
        super(event.getServer(), event.getHeader(), event.getBody());
    }

    // Getters
    getBody(): BlockPlacedBody {
        return this.body;
    }

    getPlayer(): Player {
        return this.body.player;
    }

    getBlock(): Block {
        return this.body.block;
    }

    getTool(): Tool {
        return this.body.tool;
    }
}

export { BlockPlacedBody, BlockPlacedEvent }
