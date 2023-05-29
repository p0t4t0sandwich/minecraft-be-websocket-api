import { EventName, Event, PlayerMessageEvent } from "./Events.js";
import { CommandMessage, SubscribeMessage } from "./Messages.js";

export class BedrockServer {
    // Parameters
    public userID: string;
    public ws: WebSocket;
    public isAlive: boolean = true;
    public events: any = {};

    // Constructor
    constructor(userID: string, ws: any) {
        this.userID = userID;
        this.ws = ws;
        this.isAlive = true;
        this.events = {};

        ws.on('pong', () => { this.isAlive = true });
        ws.on('message', this.onMessage.bind(this));
    }

    // Methods

    // On message handler
    async onMessage(message: string) {
        if (message == "ping" || message == "pong") return;

        const res = JSON.parse(message);
        if (res.header.messagePurpose === 'event') {
            // Handle subscribed events
            const eventName = res.header.eventName;
            if (this.events[eventName]) {
                this.events[eventName].forEach((callback: Function) => {
                    callback(res);
                });
            }

            console.log('Event: ' + eventName + ' from ' + this.userID + ': ' + message);
        }
    }

    // Send message wrapper
    async send(message: string) {
        this.ws.send(message);
    }

    // Subscribe to event
    async subscribeToEvent(event: string, callback: (res: Event) => void) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);

        // Send subscribe message
        const subscribeMessage: SubscribeMessage = new SubscribeMessage(event);
        await this.send(JSON.stringify(subscribeMessage));
    }

    // Unsubscribe from event
    async unsubscribeFromEvent(event: string) {
        if (!this.events[event]) return;

        // Send unsubscribe message
        const unsubscribeMessage: SubscribeMessage = new SubscribeMessage(event);
        await this.send(JSON.stringify(unsubscribeMessage));

        // Remove event
        delete this.events[event];
    }

    // Send command
    async sendCommand(command: string) {
        const commandMessage: CommandMessage = new CommandMessage(command);
        await this.send(JSON.stringify(commandMessage));
    }

    // Events

    // PlayerMessage
    async onPlayerMessage(callback: (res: PlayerMessageEvent) => void) {
        this.subscribeToEvent(EventName.PlayerMessage, callback);
    }
}