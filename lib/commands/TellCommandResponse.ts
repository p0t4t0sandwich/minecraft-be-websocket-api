/**
 * @autohr p0t4t0sandwich
 * @description Response packet of the `/tell` command
 */

import { CommandResponseBody, CommandResponseMessage } from "../messages/CommandMessage.js";

/**
 * @interface TellCommandResponseBody
 * @description The body of the response packet of the `/tell` command
 * @extends CommandResponseBody
 * @property {string} message The message sent to the player
 * @property {string[]} recipient The recipient of the message
 * @property {number} statusCode The status code of the command
 * @property {string} statusMessage The status message of the command
 */
interface TellCommandResponseBody extends CommandResponseBody {
    message: string;
    recipient: string[];
    statusCode: number;
    statusMessage: string;
}

/**
 * @class TellCommandResponseMessage
 * @description The response packet of the `/tell` command
 * @extends CommandResponseMessage
 * @method getRecipient() Returns the recipient of the message
 * @property {TellCommandResponseBody} body The body of the response packet
 */
class TellCommandResponseMessage extends CommandResponseMessage {
    body: TellCommandResponseBody;

    /**
     * @constructor
     * @param res The response packet
     * @description Constructor for the TellCommandResponseMessage class
     * @memberof TellCommandResponseMessage
     */
    constructor(res: CommandResponseMessage) {
        super(res);
    }

    /**
     * @method getRecipient
     * @returns {string[]} The recipient(s) of the message
     * @description Returns the recipient(s) of the message
     * @memberof TellCommandResponseMessage
     */
    public getRecipient(): string[] {
        return this.body.player;
    }
}

export { TellCommandResponseBody, TellCommandResponseMessage }
