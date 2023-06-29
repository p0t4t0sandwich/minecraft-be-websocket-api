/**
 * @author p0t4t0sandwich
 * @description Response packet of the `/list` command
 */

import { CommandResponseBody, CommandResponseMessage } from "../messages/CommandMessage.js";

/**
 * @interface ListCommandResponseBody
 * @description The body of the response packet of the `/list` command
 * @extends CommandResponseBody
 * @property {number} currentPlayerCount The current number of players in the server
 * @property {number} maxPlayerCount The maximum number of players in the server
 * @property {string} players The list of players in the server
 * @property {number} statusCode The status code of the command
 * @property {string} statusMessage The status message of the command
 */
interface ListCommandResponseBody extends CommandResponseBody {
    currentPlayerCount: number;
    maxPlayerCount: number;
    players: string;
    statusCode: number;
    statusMessage: string;
}

/**
 * @class ListCommandResponseMessage
 * @description The response packet of the `/list` command
 * @extends CommandResponseMessage
 * @method getPlayers() Returns the list of players in the server
 * @property {ListCommandResponseBody} body The body of the response packet
 */
class ListCommandResponseMessage extends CommandResponseMessage {
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

export { ListCommandResponseBody, ListCommandResponseMessage }
