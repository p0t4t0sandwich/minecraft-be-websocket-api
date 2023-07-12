/**
 * @author p0t4t0sandwich
 * @description Permissions API
 */

import { BedrockPlayer } from "../player/BedrockPlayer.js";





class PermissionsHandler {
    permissions: Map<string, Map<string, boolean>>;

    constructor() {
        this.permissions = new Map();
    }

    // Methods

    // Set permission
    setPermission(playerName: string, permission: string, value: boolean) {
        const playerPermissions = this.permissions.get(playerName);

        if (playerPermissions) {
            playerPermissions.set(permission, value);
        } else {
            this.permissions.set(playerName, new Map([[permission, value]]));
        }
    }

    // Get permission
    getPermission(playerName: string, permission: string): boolean {
        const playerPermissions = this.permissions.get(playerName);

        if (playerPermissions) {
            const permissionValue = playerPermissions.get(permission);

            if (permissionValue) {
                return permissionValue;
            } else {
                return false;
            }
        } else {
            this.permissions.set(playerName, new Map());
            return undefined;
        }
    }
}

export { PermissionsHandler };
