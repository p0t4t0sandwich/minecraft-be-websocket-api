import { Message, MessageBody } from "../messages/Messages.js";

export interface CommandBody extends MessageBody {
    origin: {
        type: "player";
    };
    commandLine: string;
    version: 1;
}

// CommandMessage
export class CommandMessage extends Message {
    body: CommandBody = {
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