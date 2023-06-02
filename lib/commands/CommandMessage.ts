import { Message, MessageBody, MessageHeader } from "../messages/Messages.js";

// CommandRequestMessage
interface CommandRequestBody extends MessageBody {
    origin: {
        type: "player" | string;
    };
    commandLine: string;
    version: 1;
}

export class CommandRequestMessage extends Message {
    body: CommandRequestBody = {
        origin: {
            type: "player"
        },
        commandLine: "",
        version: 1
    };

    // Constructor
    constructor(command: string) {
        super();
        this.header.messagePurpose = "commandRequest";
        this.header.messageType = "commandRequest";
        this.body.commandLine = command;
    }
}

// CommandResponseMessage
type CommandResponseBody = MessageBody;

export class CommandResponseMessage extends Message {
    body: CommandResponseBody;

    // Constructor
    constructor(res: Message) {
        super();
        this.header.messagePurpose = "commandResponse";
        this.body = res.body;
    }
}
