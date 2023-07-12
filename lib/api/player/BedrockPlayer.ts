/**
 * @author p0t4t0sandwich
 * @description Expands the Player class with useful data and methods
 */

import { BedrockServer } from "../../BedrockServer.js";
import { Player } from "../../game/Player.js";

class BedrockPlayer {
    // Properties
    server: BedrockServer;
    player: Player;

    // Constructor
    constructor(server: BedrockServer, player: Player) {
        this.server = server;
        this.player = player;
    }

    // Methods
    hasPermission(permission: string): boolean {
        return this.server.getPermissionsHandler().getPermission(this.player.name, permission);
    }

    // Get name
    getName(): string {
        return this.player.name;
    }

    // Send message
    sendMessage(message: string) {
        this.server.tellCommand(message, this.player.name);
    }
}



export { BedrockPlayer }
