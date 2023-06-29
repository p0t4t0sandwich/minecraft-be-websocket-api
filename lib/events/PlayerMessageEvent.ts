import { BedrockEvent, EventBody } from "./BedrockEvent.js";

// PlayerMessageEvent
interface PlayerMessageBody extends EventBody {
    message: string;
    sender: string;
    receiver: string;
    type: "chat" | "tell" | string;
}

class PlayerMessageEvent extends BedrockEvent {
    // Properties
    body: PlayerMessageBody;

    // Constructor
    constructor(event: BedrockEvent) {
        super(event.getServer(), event.getHeader(), event.getBody());
    }

    // Getters
    getBody(): PlayerMessageBody {
        return this.body;
    }

    getSender(): string {
        return this.body.sender;
    }

    getReceiver(): string {
        return this.body.receiver;
    }

    getMessage(): string {
        return this.body.message;
    }
}

export { PlayerMessageBody, PlayerMessageEvent }
