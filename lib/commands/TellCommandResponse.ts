import { CommandResponseBody, CommandResponseMessage } from "../messages/CommandMessage.js";

// TellCommandResponse
interface TellCommandResponseBody extends CommandResponseBody {
    message: string;
    recipient: string[];
    statusCode: number;
    statusMessage: string;
}

class TellCommandResponseMessage extends CommandResponseMessage {
    body: TellCommandResponseBody;

    // Constructor
    constructor(res: CommandResponseMessage) {
        super(res);
    }

    // Getters
    public getRecipient(): string[] {
        return this.body.player;
    }
}

export { TellCommandResponseBody, TellCommandResponseMessage }
