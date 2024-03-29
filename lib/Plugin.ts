// Plugin Class for extending the core functionality of the framework

import { BedrockServer } from "./BedrockServer.js";
import { MinecraftRESTServer } from "./MinecraftRESTServer.js";
import { MinecraftWebSocket } from "./MinecraftWebSocket.js";
import { Command } from "./api/command/Command.js";
import { BedrockPlayer } from "./api/player/BedrockPlayer.js";
import { EventName } from "./events/BedrockEvent.js";
import { PlayerMessageEvent } from "./events/PlayerMessageEvent.js";
import { Listener } from "./listeners/Listeners.js";
import { logger } from "./utils.js";

type CommandMap = { [key: string]: Command };

export class Plugin {
    // Properties
    readonly name: string;
    readonly description: string;
    readonly version: string;
    readonly author: string;

    private listeners: Listener[] = [];
    private commands: CommandMap = {};
    public mwss: MinecraftWebSocket;
    public mrest: MinecraftRESTServer;

    // Constructor
    constructor(name: string, description: string, version: string, author: string) {
        this.name = name;
        this.description = description;
        this.version = version;
        this.author = author;
    }

    // Methods

    // Get Listeners
    getListeners(): Listener[] {
        return this.listeners;
    }

    // Set Listeners
    setListeners(listeners: Listener[]) {
        this.listeners = listeners;
    }

    // Add Listener
    addListener(listener: Listener) {
        this.listeners.push(listener);
    }

    // Register Command
    registerCommand(command: Command) {
        this.commands[command.getName()] = command;
    }

    // Convert Commands to Listeners
    addCommandListeners() {
        this.addListener({eventName: EventName.PlayerMessage,
            callback: async (event: PlayerMessageEvent) => {
                const playerName: string = event.body.sender;

                // Ignore messages from the websocket server
                if (playerName == "Teacher") return;

                event = new PlayerMessageEvent(event);
                const message: string = event.getMessage();
                const server: BedrockServer = this.mwss.getServer(event.server);
                const player: BedrockPlayer = server.getPlayerFromCache(playerName);

                if (player == undefined) return;

                // Split message into command and arguments
                const cmd: string[] = message.split(" ");

                // Loop through commands
                for (const command of Object.values(this.commands)) {
                    // Loop through command prefixes
                    for (const commandPrefix of command.getCommandPrefixes()) {
                        // Check if message is a command
                        if (commandPrefix + command.getRootCommand() === cmd[0]) {
                            // Execute command
                            const args: string[] = cmd.slice(1);
                            command.execute(server, player, args);
                            return;
                        }
                    }
                }
        }});
    }

    // Start
    async start(mwss: MinecraftWebSocket) {
        this.mwss = mwss;

        // Add command listeners
        this.addCommandListeners();

        logger("Plugin started", this.name);
    }
}