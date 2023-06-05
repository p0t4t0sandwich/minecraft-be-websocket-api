import { CommandRequestMessage, CommandResponseMessage } from "./commands/CommandMessage.js";
import { EventSubscribeMessage, EventUnsubscribeMessage } from "./events/EventMessages.js";
import { EventName, BedrockEvent } from "./events/Events.js";
import { Message } from "./messages/Messages.js";


export class BedrockServer {
    // Parameters
    public userID: string;
    public ws: WebSocket;
    public isAlive: boolean;
    public events: any;
    public commandResponses: any;

    // Constructor
    constructor(userID: string, ws: any) {
        this.userID = userID;
        this.ws = ws;
        this.isAlive = true;
        this.events = {};
        this.commandResponses = {};

        ws.on('pong', () => { this.isAlive = true });
        ws.on('message', this.onMessage.bind(this));
    }

    // Methods

    // On message handler
    async onMessage(message: string) {
        if (message == "ping" || message == "pong") return;

        const res: any = JSON.parse(message);

        // Handle events
        if (res.header?.messagePurpose == "event") {
            const event: BedrockEvent = <BedrockEvent>res;
            event.server = this.userID;

            // Handle subscribed events
            const eventName = event.header.eventName;
            if (this.events[eventName]) {
                this.events[eventName].forEach((callback: Function) => {
                    callback(event);
                });
            }
            console.log('Event: ' + eventName + ' from ' + this.userID + ': ' + message);

        // Handle command responses
        } else if (res.header?.messagePurpose == "commandResponse") {
            const commandResponse: CommandResponseMessage = new CommandResponseMessage(<Message>res);
            const commandUUID = commandResponse.getUUID();

            if (this.commandResponses[commandUUID]) {
                this.commandResponses[commandUUID](commandResponse);
                delete this.commandResponses[commandUUID];
            }

            console.log('CommandResponse from ' + this.userID + ': ' + message);

        // Handle errors
        } else if (res.header?.messagePurpose == "error") {
            console.log('Error from ' + this.userID + ': ' + message);

        // Handle other messages
        } else {
            console.log('Message from ' + this.userID + ': ' + message);
        }
    }

    // Send message wrapper
    async send(message: string) {
        this.ws.send(message);
    }

    // Subscribe to event
    async subscribeToEvent(event: EventName, callback: (event: BedrockEvent) => void) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);

        console.log('Subscribed to ' + event + ' from ' + this.userID);

        // Send subscribe message
        const subscribeMessage: EventSubscribeMessage = new EventSubscribeMessage(event);
        await this.send(JSON.stringify(subscribeMessage));
    }

    // Unsubscribe from event
    async unsubscribeFromEvent(event: EventName) {
        if (!this.events[event]) return;

        // Send unsubscribe message
        const unsubscribeMessage: EventUnsubscribeMessage = new EventUnsubscribeMessage(event);
        await this.send(JSON.stringify(unsubscribeMessage));

        // Remove event
        delete this.events[event];
    }

    // Send command
    async sendCommand(command: string): Promise<CommandResponseMessage> {
        const commandMessage: CommandRequestMessage = new CommandRequestMessage(command);
        await this.send(JSON.stringify(commandMessage));

        const comandUUID = commandMessage.getUUID();

        return new Promise((resolve, reject) => {
            this.commandResponses[comandUUID] = (response: CommandResponseMessage) => {
                resolve(response);
            }
        });
    }
}