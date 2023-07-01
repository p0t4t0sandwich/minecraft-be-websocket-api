/**
 * @autohr p0t4t0sandwich
 * @description Response packet of the `/title` command
 */

import { CommandResponseBody, CommandResponseMessage } from "../messages/CommandMessage.js";

/**
 * @interface TitleCommandResponseBody
 * @description The body of the response packet of the `/title` command
 * @extends CommandResponseBody
 * @property {number} statusCode The status code of the command
 * @property {string} statusMessage The status message of the command
 */
interface TitleCommandResponseBody extends CommandResponseBody {
    statusCode: number;
    statusMessage: string;
}

/**
 * @class TitleCommandResponseMessage
 * @description The response packet of the `/title` command. Note that the `/title` command fires a PlayerMessageEvent
 * @extends CommandResponseMessage
 * @method getRecipient() Returns the recipient of the message
 * @property {TitleCommandResponseBody} body The body of the response packet
 */
class TitleCommandResponseMessage extends CommandResponseMessage {
    body: TitleCommandResponseBody;

    /**
     * @constructor
     * @param res The response packet
     * @description Constructor for the TitleCommandResponseMessage class
     * @memberof TitleCommandResponseMessage
     */
    constructor(res: CommandResponseMessage) {
        super(res);
    }

    /**
     * @method getRecipient
     * @returns {string[]} The recipient(s) of the message
     * @description Returns the recipient(s) of the message
     * @memberof TitleCommandResponseMessage
     */
    public getRecipient(): string[] {
        return this.body.player;
    }
}

export { TitleCommandResponseBody, TitleCommandResponseMessage }
