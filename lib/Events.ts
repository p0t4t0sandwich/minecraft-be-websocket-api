// Type definitions for Minecraft Bedrock Edition Events

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
type EventBody = any;

// Event interface
export interface BedrockEvent {
    server: string;
    header: EventHeader;
    body: EventBody;
}

// PlayerMessageEvent
export interface PlayerMessageEvent extends BedrockEvent {
    header: {
        eventName: EventName.PlayerMessage,
        messagePurpose: "event",
        version: number
    };
    body: {
        message: string;
        sender: string;
        receiver: string;
        type: "chat" | "tell";
    };
}
