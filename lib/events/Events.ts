// Type definitions for Minecraft Bedrock Edition Events

import { MessageBody, MessageHeader } from "../messages/Messages.js";

// EventName enum
export enum EventName {
    BlockBroken = "BlockBroken",
    BlockPlaced = "BlockPlaced",
    PlayerMessage = "PlayerMessage"
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

// Tool interface
interface Tool {
    aux: number;
    enchantments: [];
    freeStackSize: number;
    id: string;
    maxStackSize: number;
    namespace: string;
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
