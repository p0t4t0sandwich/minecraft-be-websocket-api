import { Message, MessageBody } from "../messages/Messages.js";

// CommandRequestMessage
export interface CommandRequestBody extends MessageBody {
    origin: {
        type: "player" | string;
    };
    commandLine: string;
    version: 1;
}

export class CommandRequestMessage extends Message {
    // Properties
    body: CommandRequestBody;

    // Constructor
    constructor(command: string) {
        super();
        this.header.messagePurpose = "commandRequest";
        this.header.messageType = "commandRequest";
        this.body.origin.type = "player"
        this.body.commandLine = command;
    }
}

// CommandResponseMessage
export type CommandResponseBody = MessageBody;

export class CommandResponseMessage extends Message {
    body: CommandResponseBody;

    // Constructor
    constructor(res: Message) {
        super();
        this.header.messagePurpose = "commandResponse";
        if (res.header.requestId) this.header.requestId = res.header.requestId;
        this.body = res.body;
    }
}

// ListCommandResponse
export interface ListCommandResponseBody extends CommandResponseBody {
    currentPlayerCount: number;
    maxPlayerCount: number;
    players: string;
    statusCode: number;
    statusMessage: string;
}

export class ListCommandResponseMessage extends CommandResponseMessage {
    body: ListCommandResponseBody;

    // Constructor
    constructor(res: CommandResponseMessage) {
        super(res);
    }

    // Getters
    public getPlayers(): string[] {
        return this.body.players.split(", ");
    }
}
