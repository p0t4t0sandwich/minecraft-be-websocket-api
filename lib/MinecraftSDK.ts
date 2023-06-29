// Minecraft SDK for the Minecraft BE REST API

import { CommandResponseMessage } from "./messages/CommandMessage.js";
import { GamemodeCommandResponseMessage } from "./commands/GamemodeCommandResponse.js";
import { ListCommandResponseMessage } from "./commands/ListCommandResponse.js";
import { TellCommandResponseMessage } from "./commands/TellCommandResponse.js";
import { EventName } from "./events/BedrockEvent.js"

export class MinecraftSDK {
    // Properties
    private rootEndpoint: string;

    // Constructor
    constructor(rootEndpoint: string) {
        this.rootEndpoint = rootEndpoint;
    }

    // Methods

    // API Call
    async apiCall(rootEndpoint: string, method: string, body: any): Promise<any> {
        try {
            // Send event to endpoint
            const response = await fetch(rootEndpoint, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            // Return response
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    // Subscribe to event
    async subscribeToEvent(server: string, event: EventName, callback_uri: string): Promise<void> {
        // Subscribe to event
        await this.apiCall(this.rootEndpoint + "/event", "POST", { server, event, callback_uri });
    }

    // Unsubscribe from event
    async unsubscribeFromEvent(server: string, event: EventName): Promise<void> {
        // Unsubscribe from event
        await this.apiCall(this.rootEndpoint + "/event", "DELETE", { server, event });
    }

    // Send command message
    async sendCommandMessage<R>(server: string, command: string): Promise<R> {
        // Send command
        const response = <R>(await this.apiCall(this.rootEndpoint + "/command", "POST", { server, command }));

        // Return response
        return response;
    }

    // Send command
    async sendCommand(server: string, command: string): Promise<CommandResponseMessage> {
        // Send command
        return await this.sendCommandMessage<CommandResponseMessage>(server, command);
    }

    // TODO: Create response class
    // Effect command
    async effectCommand(server: string, target: string, effect: string, seconds: number, amplifier: number): Promise<CommandResponseMessage> {
        // Send Effect command
        return await this.sendCommandMessage<CommandResponseMessage>(server, `effect ${target} ${effect} ${seconds} ${amplifier}`);
    }

    // Gamemode command
    async gamemodeCommand(server: string, gamemode: string, player: string): Promise<GamemodeCommandResponseMessage> {
        // Send Gamemode command
        return await this.sendCommandMessage<GamemodeCommandResponseMessage>(server, `gamemode ${gamemode} ${player}`);
    }

    // TODO: Create response class
    // Globalpause command
    async globalpauseCommand(server: string, pause: boolean): Promise<CommandResponseMessage> {
        // Send Globalpause command
        return await this.sendCommandMessage<CommandResponseMessage>(server, `globalpause ${pause}`);
    }

    // List command
    async listCommand(server: string): Promise<ListCommandResponseMessage> {
        // Send List command
        return await this.sendCommandMessage<ListCommandResponseMessage>(server, "list");
    }

    // TODO: Create response class
    // Say command
    async sayCommand(server: string, message: string): Promise<CommandResponseMessage> {
        // Send Say command
        return await this.sendCommandMessage<CommandResponseMessage>(server, `say ${message}`);
    }

    // TODO: Create response class
    // Teleport player to position command
    async teleportCommand(server: string, target: string, x: number, y: number, z: number): Promise<CommandResponseMessage> {
        // Send Teleport command
        return await this.sendCommandMessage<CommandResponseMessage>(server, `tp ${target} ${x} ${y} ${z}`);
    }

    // TODO: Create response class
    // Teleport player to player command
    async teleportPlayerToPlayerCommand(server: string, target: string, destination: string): Promise<CommandResponseMessage> {
        // Send Teleport command
        return await this.sendCommandMessage<CommandResponseMessage>(server, `tp ${target} ${destination}`);
    }

    // Tell command
    async tellCommand(server: string, target: string, message: string): Promise<TellCommandResponseMessage> {
        // Send Tell command
        return await this.sendCommandMessage<TellCommandResponseMessage>(server, `tell ${target} ${message}`);
    }
}
