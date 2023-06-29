import { Block } from "../game/Block.js";
import { Player } from "../game/Player.js";
import { Tool } from "../game/Tool.js";
import { BedrockEvent, EventBody } from "./BedrockEvent.js";

// BlockBrokenEvent
interface BlockBrokenBody extends EventBody {
    block: Block,
    count: number,
    destructionMethod: string,
    player: Player,
    tool: Tool,
    variant: number
}

class BlockBrokenEvent extends BedrockEvent {
    // Properties
    body: BlockBrokenBody;

    // Constructor
    constructor(event: BedrockEvent) {
        super(event.getServer(), event.getHeader(), event.getBody());
    }

    // Getters
    getBody(): BlockBrokenBody {
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

export { BlockBrokenBody, BlockBrokenEvent }
