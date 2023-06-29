/**
 * @author p0t4t0sandwich
 * @description Response packet of the `/gamemode` command
 */

import { CommandResponseBody, CommandResponseMessage } from "../messages/CommandMessage.js";

/**
 * @interface GamemodeCommandResponseBody
 * @description The body of the response packet of the `/gamemode` command
 * @extends CommandResponseBody
 * @property {string} gameMode The game mode of the player
 * @property {string[]} player The list of players that were affected by the command
 * @property {number} statusCode The status code of the command
 * @property {string} statusMessage The status message of the command
 */
interface GamemodeCommandResponseBody extends CommandResponseBody {
    gameMode: "%createWorldScreen.gameMode.adventure" | string;
    player: string[];
    statusCode: number;
    statusMessage: string;
}

/**
 * @class GamemodeCommandResponseMessage
 * @description The response packet of the `/gamemode` command
 * @extends CommandResponseMessage
 * @method getPlayers() Returns the list of players that were affected by the command
 * @property {GamemodeCommandResponseBody} body The body of the response packet
 */
class GamemodeCommandResponseMessage extends CommandResponseMessage {
    body: GamemodeCommandResponseBody;

    /**
     * @constructor
     * @param res The response packet
     * @description Constructor for the GamemodeCommandResponseMessage class
     * @memberof GamemodeCommandResponseMessage
     */
    constructor(res: CommandResponseMessage) {
        super(res);
    }

    /**
     * @method getPlayers
     * @description Returns the list of players that were affected by the command
     * @returns {string[]} The list of players that were affected by the command
     * @memberof GamemodeCommandResponseMessage
     */
    public getPlayers(): string[] {
        return this.body.player;
    }
}

export { GamemodeCommandResponseBody, GamemodeCommandResponseMessage }
