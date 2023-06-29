import { Item } from "../game/Item.js";
import { Player } from "../game/Player.js";
import { BedrockEvent, EventBody } from "./BedrockEvent.js";

// ItemUsedEvent
interface ItemUsedBody extends EventBody {
    count: number,
    item: Item,
    player: Player,
    useMethod: number
}

class ItemUsedEvent extends BedrockEvent {
    // Properties
    body: ItemUsedBody;

    // Constructor
    constructor(event: BedrockEvent) {
        super(event.getServer(), event.getHeader(), event.getBody());
    }
}

export { ItemUsedBody, ItemUsedEvent }
