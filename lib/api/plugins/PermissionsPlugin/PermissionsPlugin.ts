// PermissionsPlugin

import { BedrockServer } from "../../../BedrockServer.js";
import { DataStore } from "../../../DataStore.js";
import { MinecraftWebSocket } from "../../../MinecraftWebSocket.js";
import { Plugin } from "../../../Plugin.js";

export class PermissionsPlugin extends Plugin {
    // Properties
    private ds: DataStore;

    // Constructor
    constructor(ds: DataStore) {
        // Set plugin info
        super(
            "Permissions Plugin",
            "Permissions plugin for MWSS.",
            "1.0.0",
            "p0t4t0sandwich"
        );

        // Set data store
        this.ds = ds;
    }

    // Methods

    // Set permssion
    setPermission(server: BedrockServer, playerName: string, permission: string, value: boolean): void {
        server.getPermissionsHandler().setPermission(playerName, permission, value);
    }

    // Get permission
    static getPermission(server: BedrockServer, playerName: string, permission: string): boolean {
        return server.getPermissionsHandler().getPermission(playerName, permission);
    }

    // Start
    async start(mwss: MinecraftWebSocket): Promise<void> {
        this.mwss = mwss;

        console.log("Permissions plugin started!");
    }
}