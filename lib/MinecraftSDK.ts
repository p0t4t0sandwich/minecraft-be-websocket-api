// Minecraft SDK for the Minecraft BE REST API

import { CommandResponseMessage } from "./commands/CommandMessage.js";
import { EventName } from "./events/Events.js";

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

    // Send command
    async sendCommand(server: string, command: string): Promise<CommandResponseMessage> {
        // Send command
        const response = await this.apiCall(this.rootEndpoint + "/command", "POST", { server, command });

        // Return response
        return await response.json();
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
}