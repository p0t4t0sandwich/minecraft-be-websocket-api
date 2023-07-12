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
    permissions: string[] = [];

    // Constructor
    constructor(server: BedrockServer, player: Player, permissions?: string[]) {
        this.server = server;
        this.player = player;
        if (permissions) this.permissions = permissions;
    }

    // Methods
    hasPermission(permission: string): boolean {
        return this.permissions.includes(permission);
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
