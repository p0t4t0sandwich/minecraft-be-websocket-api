// PlayerCachePlugin

import { BedrockServer } from "../../../BedrockServer.js";
import { MinecraftWebSocket } from "../../../MinecraftWebSocket.js";
import { Plugin } from "../../../Plugin.js";
import { EventName } from "../../../events/BedrockEvent.js";
import { PlayerJoinEvent } from "../../../events/PlayerJoinEvent.js";
import { PlayerLeaveEvent } from "../../../events/PlayerLeaveEvent.js";
import { PlayerTransformEvent } from "../../../events/PlayerTransformEvent.js";
import { BedrockPlayer } from "../../player/BedrockPlayer.js";

export class PlayerCachePlugin extends Plugin {
    // Constructor
    constructor() {
        // Set plugin info
        super(
            "Player Cache Plugin",
            "A plugin for managing the internal player cache.",
            "1.0.0",
            "p0t4t0sandwich"
        );

        // Set listeners
        this.setListeners([
            { eventName: EventName.PlayerJoin, callback: this.onPlayerJoin.bind(this) },
            { eventName: EventName.PlayerLeave, callback: this.onPlayerLeave.bind(this) },
            { eventName: EventName.PlayerTransform, callback: this.onPlayerTransform.bind(this) }
        ]);
    }

    // Methods

    // Player join event
    onPlayerJoin(event: PlayerJoinEvent) {
        event = new PlayerJoinEvent(event);

        const server: BedrockServer = this.mwss.getServer(event.server);
        const player: BedrockPlayer = new BedrockPlayer(server, event.getPlayer());

        server.setPlayerInCache(player);
    }

    // Player leave event
    onPlayerLeave(event: PlayerLeaveEvent) {
        event = new PlayerLeaveEvent(event);

        const server: BedrockServer = this.mwss.getServer(event.server);
        const player: BedrockPlayer = new BedrockPlayer(server, event.getPlayer());

        server.removePlayerFromCache(player);
    }

    // Player transform event
    onPlayerTransform(event: PlayerTransformEvent) {
        event = new PlayerTransformEvent(event);

        const server: BedrockServer = this.mwss.getServer(event.server);
        let player: BedrockPlayer = server.getPlayerFromCache(event.getPlayer().name);

        if (player === undefined) {
            player = new BedrockPlayer(server, event.getPlayer());
        } else {
            player.updatePlayer(event.getPlayer());
        }
        server.setPlayerInCache(player);
    }

    // Start
    async start(mwss: MinecraftWebSocket) {
        this.mwss = mwss;

        console.log("Player Cache plugin started!");
    }
}