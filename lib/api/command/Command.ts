/**
 * @author p0t4t0sandwich
 * @description Command API
 */

import { BedrockServer } from "../../BedrockServer.js";
import { BedrockPlayer } from "../player/BedrockPlayer.js";


class Command {
    // Properties
    private name: string;
    private description: string;
    private usage: string;
    private prefferedCommandPrefix: string;
    private commandPrefixes: string[];
    private permission: string;
    private isPermissionDefault: boolean;

    // Constructor
    constructor(name: string, description: string, usage: string, commandPrefix: string, alternateCommandPrefixes: string[], permission: string, isPermissionDefault: boolean) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.prefferedCommandPrefix = commandPrefix;
        this.commandPrefixes = [commandPrefix, ...alternateCommandPrefixes];
        this.permission = permission;
        this.isPermissionDefault = isPermissionDefault;
    }

    // Methods
    async execute(server: BedrockServer, player: BedrockPlayer, args: string[]) {}

    // Get name
    getName(): string {
        return this.name;
    }

    // Get description
    getDescription(): string {
        return this.description;
    }

    // Get usage
    getUsage(): string {
        return this.usage;
    }

    // Get prefferedCommandPrefix
    getPrefferedCommandPrefix(): string {
        return this.prefferedCommandPrefix;
    }

    // Get commandPrefixes
    getCommandPrefixes(): string[] {
        return this.commandPrefixes;
    }

    // Get permission
    getPermission(): string {
        return this.permission;
    }

    // Get isPermissionDefault
    getIsPermissionDefault(): boolean {
        return this.isPermissionDefault;
    }

    // Check permission
    hasPermission(player: BedrockPlayer): boolean {
        const playerPermission = player.hasPermission(this.permission);

        if (playerPermission === undefined) {
            player.server.getPermissionsHandler().setPermission(player.getName(), this.permission, this.isPermissionDefault);
        } else {
            return playerPermission;
        }
    }
}

export { Command };
