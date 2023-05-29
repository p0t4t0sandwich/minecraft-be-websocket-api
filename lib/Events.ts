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
export interface Event {
    header: EventHeader;
    body: EventBody;
}

// PlayerMessageEvent
export interface PlayerMessageEvent extends Event {
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
