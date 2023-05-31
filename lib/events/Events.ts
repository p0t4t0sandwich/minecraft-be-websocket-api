// Type definitions for Minecraft Bedrock Edition Events

import { MessageBody, MessageHeader } from "../messages/Messages.js";

// EventName enum
export enum EventName {
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
    server: string;
    header: EventHeader;
    body: EventBody;
}


// Event response interfaces

interface PlayerMessageBody extends EventBody {
    message: string;
    sender: string;
    receiver: string;
    type: "chat" | "tell";
}

// PlayerMessageEvent
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
