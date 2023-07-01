/**
 * @author p0t4t0sandwich
 * @description BlockPlaced event packet
 */

import { Block } from "../game/Block.js";
import { Player } from "../game/Player.js";
import { Tool } from "../game/Tool.js";
import { BedrockEvent, EventBody } from "./BedrockEvent.js";

/**
 * @interface BlockPlacedBody
 * @description The body of the BlockPlaced event packet
 * @extends EventBody
 * @property {Block} block The block that was placed
 * @property {number} count The number of blocks that were placed
 * @property {boolean} placedUnderwater Whether or not the block was placed underwater
 * @property {number} placementMethod The method used to place the block
 * @property {Player} player The player that placed the block
 * @property {Tool} tool The tool used to place the block
 */
interface BlockPlacedBody extends EventBody {
    block: Block,
    count: number,
    placedUnderwater: boolean,
    placementMethod: number,
    player: Player,
    tool: Tool
}

/**
 * @class BlockPlacedEvent
 * @description The BlockPlaced event packet
 * @extends BedrockEvent
 * @method getBody() Returns the body of the event packet
 * @method getBlock() Returns the block that was placed
 * @method getPlayer() Returns the player that placed the block
 * @method getTool() Returns the tool used to break the block
 * @property {BlockPlacedBody} body The body of the event packet
 */
class BlockPlacedEvent extends BedrockEvent {
    body: BlockPlacedBody;

    /**
     * @constructor
     * @param event The event packet
     * @description Constructor for the BlockPlacedEvent class
     * @memberof BlockPlacedEvent
     */
    constructor(event: BedrockEvent) {
        super(event.getServer(), event.getHeader(), event.getBody());
    }

    /**
     * @method getBody
     * @description Returns the body of the event packet
     * @returns {BlockPlacedBody} The body of the event packet
     * @memberof BlockPlacedEvent
     */
    getBody(): BlockPlacedBody {
        return this.body;
    }

    /**
     * @method getPlayer
     * @description Returns the player that placed the block
     * @returns {Player} The player that placed the block
     * @memberof BlockPlacedEvent
     */
    getPlayer(): Player {
        return this.body.player;
    }

    /**
     * @method getBlock
     * @description Returns the block that was placed
     * @returns {Block} The block that was placed
     * @memberof BlockPlacedEvent
     */
    getBlock(): Block {
        return this.body.block;
    }

    /**
     * @method getTool
     * @description Returns the tool used to break the block
     * @returns {Tool} The tool used to break the block
     * @memberof BlockPlacedEvent
     */
    getTool(): Tool {
        return this.body.tool;
    }
}

export { BlockPlacedBody, BlockPlacedEvent }
