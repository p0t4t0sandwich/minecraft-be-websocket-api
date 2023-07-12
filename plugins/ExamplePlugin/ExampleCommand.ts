// ExampleCommand

import { BedrockServer } from "../../lib/BedrockServer.js";
import { Command } from "../../lib/api/command/Command.js";
import { BedrockPlayer } from "../../lib/api/player/BedrockPlayer.js";

class ExampleCommand extends Command {
    // Constructor
    constructor() {
        super(
            "Example Command",
            "Example command",
            "!example",
            "!", [],
            "example.permission", true
        );
    }

    // Methods
    async execute(server: BedrockServer, player: BedrockPlayer, args: string[]) {
        player.sendMessage("Example command executed!");
    }
}

export { ExampleCommand };
