// Type definitions for Minecraft Bedrock Edition Events

import { MessageBody, MessageHeader } from "../messages/Messages.js";

// EventName enum

// Notes:
// - ItemNamed may not work
// - StartWorld may not work
// - WorldLoaded may not work
// - WorldGenerated may not work
// - WorldUnloaded may not work

export enum EventName {
    BlockBroken = "BlockBroken",
    BlockPlaced = "BlockPlaced",
    ItemNamed = "ItemNamed",
    ItemUsed = "ItemUsed",
    PlayerJoin = "PlayerJoin",
    PlayerLeave = "PlayerLeave",
    PlayerMessage = "PlayerMessage",
    PlayerTransform = "PlayerTransform",
    StartWorld = "StartWorld",
    WorldLoaded = "WorldLoaded",
    WorldGenerated = "WorldGenerated",
    WorldUnloaded = "WorldUnloaded",
}

// EventHeader interface
interface EventHeader {
    eventName: EventName;
    messagePurpose: "event";
    version: number;
}

// EventBody type
interface EventBody extends MessageBody {
    [key: string]: any;
}

// Event interface
export class BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: EventBody;
}

// Block interface
interface Block {
    aux: number;
    id: string;
    namespace: "minecraft" | string;
}

// Player interface
interface Player {
    color: string;
    dimension: number;
    id: number;
    name: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    type: "minecraft:player" | string;
    variant: number;
    yRot: number;
}

// Item interface
interface Item {
    aux: number;
    id: string;
    namespace: "minecraft" | string;
}

// Tool interface
interface Tool extends Item {
    enchantments: [];
    freeStackSize: number;
    maxStackSize: number;
    stackSize: number;
}


// Event response interfaces

// BlockBrokenEvent
interface BlockBrokenBody extends EventBody {
    block: Block,
    count: number,
    destructionMethod: string,
    player: Player,
    tool: Tool,
    variant: number
}

export class BlockBrokenEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: BlockBrokenBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <BlockBrokenBody>event.body;
    }
}

// BlockPlacedEvent
interface BlockPlacedBody extends EventBody {
    block: Block,
    count: number,
    placedUnderwater: boolean,
    placementMethod: number,
    player: Player,
    tool: Tool
}

export class BlockPlacedEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: BlockPlacedBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <BlockPlacedBody>event.body;
    }
}

// ItemUsedEvent
interface ItemUsedBody extends EventBody {
    count: number,
    item: Item,
    player: Player,
    useMethod: number
}

export class ItemUsedEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: ItemUsedBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <ItemUsedBody>event.body;
    }
}

// PlayerJoinEvent
interface PlayerJoinBody extends EventBody {
    player: Player;
}

export class PlayerJoinEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: PlayerJoinBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <PlayerJoinBody>event.body;
    }
}

// PlayerLeaveEvent
interface PlayerLeaveBody extends EventBody {
    player: Player;
}

export class PlayerLeaveEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: PlayerLeaveBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <PlayerLeaveBody>event.body;
    }
}

// PlayerMessageEvent
interface PlayerMessageBody extends EventBody {
    message: string;
    sender: string;
    receiver: string;
    type: "chat" | "tell" | string;
}

export class PlayerMessageEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: PlayerMessageBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <PlayerMessageBody>event.body;
    }
}

// PlayerTransformEvent
interface PlayerTransformBody extends EventBody {
    player: Player;
}

export class PlayerTransformEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: PlayerTransformBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <PlayerTransformBody>event.body;
    }
}
