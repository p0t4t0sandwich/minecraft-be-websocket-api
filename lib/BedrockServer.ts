import { CommandRequestMessage, CommandResponseMessage, ListCommandResponseMessage } from "./commands/CommandMessage.js";
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
            const event: BedrockEvent = new BedrockEvent(this.userID, res.header, res.body);

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

    // Send command message
    async sendCommandMessage<T,R>(commandMessage: T): Promise<R> {
        await this.send(JSON.stringify(commandMessage));

        const comandUUID = (<CommandRequestMessage>commandMessage).getUUID();

        return new Promise((resolve, reject) => {
            this.commandResponses[comandUUID] = (response: R) => {
                resolve(response);
            }
        });
    }

    // Send command
    async sendCommand(command: string): Promise<CommandResponseMessage> {
        const commandMessage: CommandRequestMessage = new CommandRequestMessage(command);
        const commandResponse: CommandResponseMessage = await this.sendCommandMessage<CommandRequestMessage, CommandResponseMessage>(commandMessage);
        return new CommandResponseMessage(commandResponse);
    }

    // TODO: Create response class
    // Effect command
    async effectCommand(target: string, effect: string, seconds: number, amplifier: number): Promise<CommandResponseMessage> {
        const effectCommand: CommandRequestMessage = new CommandRequestMessage(`effect ${target} ${effect} ${seconds} ${amplifier}`);
        const effectResponse: CommandResponseMessage = await this.sendCommandMessage<CommandRequestMessage, CommandResponseMessage>(effectCommand);
        return new CommandResponseMessage(effectResponse);
    }

    // TODO: Create response class
    // Gamemode command
    async gamemodeCommand(gamemode: string, player: string): Promise<CommandResponseMessage> {
        const gamemodeCommand: CommandRequestMessage = new CommandRequestMessage(`gamemode ${gamemode} ${player}`);
        const gamemodeResponse: CommandResponseMessage = await this.sendCommandMessage<CommandRequestMessage, CommandResponseMessage>(gamemodeCommand);
        return new CommandResponseMessage(gamemodeResponse);
    }

    // TODO: Create response class
    // Globalpause command
    async globalpauseCommand(pause: boolean): Promise<CommandResponseMessage> {
        const globalpauseCommand: CommandRequestMessage = new CommandRequestMessage(`globalpause ${pause}`);
        const globalpauseResponse: CommandResponseMessage = await this.sendCommandMessage<CommandRequestMessage, CommandResponseMessage>(globalpauseCommand);
        return new CommandResponseMessage(globalpauseResponse);
    }

    // List command
    async listCommand(): Promise<ListCommandResponseMessage> {
        const listCommand: CommandRequestMessage = new CommandRequestMessage('list');
        const listResponse: ListCommandResponseMessage = await this.sendCommandMessage<CommandRequestMessage, ListCommandResponseMessage>(listCommand);
        return new ListCommandResponseMessage(listResponse);
    }

    // TODO: Create response class
    // Say command
    async sayCommand(message: string): Promise<CommandResponseMessage> {
        const sayCommand: CommandRequestMessage = new CommandRequestMessage(`say ${message}`);
        const sayResponse: CommandResponseMessage = await this.sendCommandMessage<CommandRequestMessage, CommandResponseMessage>(sayCommand);
        return new CommandResponseMessage(sayResponse);
    }

    // TODO: Create response class
    // Teleport player to position command
    async teleportPlayerToPositionCommand(player: string, x: number, y: number, z: number): Promise<CommandResponseMessage> {
        const teleportCommand: CommandRequestMessage = new CommandRequestMessage(`tp ${player} ${x} ${y} ${z}`);
        const teleportResponse: CommandResponseMessage = await this.sendCommandMessage<CommandRequestMessage, CommandResponseMessage>(teleportCommand);
        return new CommandResponseMessage(teleportResponse);
    }

    // TODO: Create response class
    // Teleport player to player command
    async teleportPlayerToPlayerCommand(player: string, target: string): Promise<CommandResponseMessage> {
        const teleportCommand: CommandRequestMessage = new CommandRequestMessage(`tp ${player} ${target}`);
        const teleportResponse: CommandResponseMessage = await this.sendCommandMessage<CommandRequestMessage, CommandResponseMessage>(teleportCommand);
        return new CommandResponseMessage(teleportResponse);
    }

    // TODO: Create response class
    // Tell command
    async tellCommand(player: string, message: string): Promise<CommandResponseMessage> {
        const tellCommand: CommandRequestMessage = new CommandRequestMessage(`tell ${player} ${message}`);
        const tellResponse: CommandResponseMessage = await this.sendCommandMessage<CommandRequestMessage, CommandResponseMessage>(tellCommand);
        return new CommandResponseMessage(tellResponse);
    }
}