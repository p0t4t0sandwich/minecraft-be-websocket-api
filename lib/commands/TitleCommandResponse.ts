import { CommandResponseBody, CommandResponseMessage } from "../messages/CommandMessage.js";


// Note: "/title playerName message" fires a PlayerMessageEvent

// TitleCommandResponse
interface TitleCommandResponseBody extends CommandResponseBody {
    statusCode: number;
    statusMessage: string;
}

class TitleCommandResponseMessage extends CommandResponseMessage {
    body: TitleCommandResponseBody;

    // Constructor
    constructor(res: CommandResponseMessage) {
        super(res);
    }

    // Getters
    public getRecipient(): string[] {
        return this.body.player;
    }
}

export { TitleCommandResponseBody, TitleCommandResponseMessage }
