import { Message, MessageBody } from "./Messages.js";

interface EventBody extends MessageBody {
    eventName: string;
}

// EventMessage
class EventMessage extends Message {
    // Properties
    body: EventBody = {
        eventName: ""
    };

    // Constructor
    constructor(eventName: string) {
        super();
        this.header.messageType = "commandResponse";
        this.body.eventName = eventName;
    }
}

// EventSubscribeMessage
export class EventSubscribeMessage extends EventMessage {
    // Constructor
    constructor(eventName: string) {
        super(eventName);
        this.header.messagePurpose = "subscribe";
    }
}

// EventUnsubscribeMessage
export class EventUnsubscribeMessage extends EventMessage {
    // Constructor
    constructor(eventName: string) {
        super(eventName);
        this.header.messagePurpose = "unsubscribe";
    }
}
