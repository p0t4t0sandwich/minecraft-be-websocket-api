/**
 * @author p0t4t0sandwich
 * @description BlockBroken event packet
 */

import { Block } from "../game/Block.js";
import { Player } from "../game/Player.js";
import { Tool } from "../game/Tool.js";
import { BedrockEvent, EventBody } from "./BedrockEvent.js";

/**
 * @interface BlockBrokenBody
 * @description The body of the BlockBroken event packet
 * @extends EventBody
 * @property {Block} block The block that was broken
 * @property {number} count The number of blocks that were broken
 * @property {string} destructionMethod The method used to break the block
 * @property {Player} player The player that broke the block
 * @property {Tool} tool The tool used to break the block
 * @property {number} variant The variant of the block that was broken
 */
interface BlockBrokenBody extends EventBody {
    block: Block,
    count: number,
    destructionMethod: string,
    player: Player,
    tool: Tool,
    variant: number
}

/**
 * @class BlockBrokenEvent
 * @description The BlockBroken event packet
 * @extends BedrockEvent
 * @method getBody() Returns the body of the event packet
 * @method getBlock() Returns the block that was broken
 * @method getPlayer() Returns the player that broke the block
 * @method getTool() Returns the tool used to break the block
 * @property {BlockBrokenBody} body The body of the event packet
 */
class BlockBrokenEvent extends BedrockEvent {
    body: BlockBrokenBody;

    /**
     * @constructor
     * @param event The event packet
     * @description Constructor for the BlockBrokenEvent class
     * @memberof BlockBrokenEvent
     */
    constructor(event: BedrockEvent) {
        super(event.getServer(), event.getHeader(), event.getBody());
    }

    /**
     * @method getBody
     * @description Returns the body of the event packet
     * @returns {BlockBrokenBody} The body of the event packet
     * @memberof BlockBrokenEvent
     */
    getBody(): BlockBrokenBody {
        return this.body;
    }

    /**
     * @method getPlayer
     * @description Returns the player that broke the block
     * @returns {Player} The player that broke the block
     * @memberof BlockBrokenEvent
     */
    getPlayer(): Player {
        return this.body.player;
    }

    /**
     * @method getBlock
     * @description Returns the block that was broken
     * @returns {Block} The block that was broken
     * @memberof BlockBrokenEvent
     */
    getBlock(): Block {
        return this.body.block;
    }

    /**
     * @method getTool
     * @description Returns the tool used to break the block
     * @returns {Tool} The tool used to break the block
     * @memberof BlockBrokenEvent
     */
    getTool(): Tool {
        return this.body.tool;
    }
}

export { BlockBrokenBody, BlockBrokenEvent }
