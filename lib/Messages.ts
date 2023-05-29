import { v4 as uuidv4 } from 'uuid';

// Header
interface Header {
    requestId: string;
    messagePurpose: string;
    messageType: string;
    version: 1;
}

// Body
type Body = any;

// Message
class Message {
    header: Header;
    body: Body;
}

// EventMessage
class EventMessage extends Message {
    // Properties
    header: Header = {
        requestId: uuidv4(),
        messagePurpose: "",
        messageType: "commandResponse",
        version: 1
    };
    body: { eventName: string } = {
        eventName: ""
    };

    // Constructor
    constructor(eventName: string) {
        super();
        this.body.eventName = eventName;
    }
}

// SubscribeMessage
export class SubscribeMessage extends EventMessage {
    // Constructor
    constructor(eventName: string) {
        super(eventName);
        this.header.messagePurpose = "subscribe";
    }
}

// UnsubscribeMessage
export class UnsubscribeMessage extends EventMessage {
    // Constructor
    constructor(eventName: string) {
        super(eventName);
        this.header.messagePurpose = "unsubscribe";
    }
}

// CommandMessage
export class CommandMessage extends Message {
    // Properties
    header: Header = {
        requestId: uuidv4(),
        messagePurpose: "commandRequest",
        messageType: "commandRequest",
        version: 1
    };
    body: {
        origin: {
            type: "player";
        };
        commandLine: string;
        version: 1;
    } = {
        origin: {
            type: "player"
        },
        commandLine: "",
        version: 1
    };

    // Constructor
    constructor(command: string) {
        super();
        this.body.commandLine = command;
    }
}

