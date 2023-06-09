import { CommandRequestMessage, CommandResponseMessage } from "./messages/CommandMessage.js";
import { EventSubscribeMessage, EventUnsubscribeMessage } from "./messages/EventMessages.js";
import { EventName, BedrockEvent } from "./events/BedrockEvent.js"
import { Message } from "./messages/Messages.js";
import { logger } from "./utils.js";
import { ListCommandResponseMessage } from "./commands/ListCommandResponse.js";
import { GamemodeCommandResponseMessage } from "./commands/GamemodeCommandResponse.js";
import { TellCommandResponseMessage } from "./commands/TellCommandResponse.js";
import { BedrockPlayer } from "./api/player/BedrockPlayer.js";
import { PlayerJoinEvent } from "./events/PlayerJoinEvent.js";
import { PlayerLeaveEvent } from "./events/PlayerLeaveEvent.js";
import { PermissionsHandler } from "./api/permission/PermissionsHandler.js";
import { PlayerMessageEvent } from "./events/PlayerMessageEvent.js";

type BedrockPlayerMap = { [key: string]: BedrockPlayer };

export class BedrockServer {
    // Parameters
    public serverId: string;
    public ws: WebSocket;
    public isAlive: boolean;
    public events: any;
    public commandResponses: any;
    private playerCache: BedrockPlayerMap = {};
    private permissionsHandler: PermissionsHandler = new PermissionsHandler();

    // Constructor
    constructor(serverId: string, ws: any) {
        this.serverId = serverId;
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
            const event: BedrockEvent = new BedrockEvent(this.serverId, res.header, res.body);
            const eventName: string = event.header.eventName;


            let player: BedrockPlayer;

            // Handle player events
            switch (eventName) {
                // Handle player join event
                case EventName.PlayerJoin:
                    // Log join message
                    logger(new PlayerJoinEvent(event).getPlayer().name + " joined the server!", this.serverId);
                    break;

                // Handle player leave event
                case EventName.PlayerLeave:
                    // Log leave message
                    logger(new PlayerLeaveEvent(event).getPlayer().name + " left the server!", this.serverId);
                    break;

                case EventName.PlayerMessage:
                    const playerMessageEvent = new PlayerMessageEvent(event)
                    // Log message
                    logger(playerMessageEvent.getSender() + ": " + playerMessageEvent.getMessage(), this.serverId);
                    break;

                default:
                    const ignoreEventsInLog: EventName[] = [
                        EventName.ChunkChanged,
                        EventName.PlayerTransform
                    ];

                    if (ignoreEventsInLog.includes(<EventName> eventName)) break;

                    logger('Event: ' + eventName + ': ' + message, this.serverId);
                    break;
            }

            // Handle subscribed events
            if (this.events[eventName]) {
                this.events[eventName].forEach((callback: Function) => callback(event));
            }

        // Handle command responses
        } else if (res.header?.messagePurpose == "commandResponse") {
            const commandResponse: CommandResponseMessage = new CommandResponseMessage(<Message>res);
            const commandUUID = commandResponse.getUUID();

            if (this.commandResponses[commandUUID]) {
                this.commandResponses[commandUUID](commandResponse);
                delete this.commandResponses[commandUUID];
            }

            logger('CommandResponse: ' + message, this.serverId);

        // Handle errors
        } else if (res.header?.messagePurpose == "error") {
            logger('Error: ' + message, this.serverId);

        // Handle other messages
        } else {
            logger('Message: ' + message, this.serverId);
        }
    }

    // Set player in cache
    setPlayerInCache(player: BedrockPlayer) {
        this.playerCache[player.getName()] = player;
    }

    // Get player from cache
    getPlayerFromCache(playerName: string): BedrockPlayer {
        return this.playerCache[playerName];
    }

    // Remove player from cache
    removePlayerFromCache(player: BedrockPlayer) {
        const playerName: string = player.getName();
        if (this.playerCache[playerName]) delete this.playerCache[playerName];
    }

    // Get permissions handler
    getPermissionsHandler(): PermissionsHandler {
        return this.permissionsHandler;
    }

    // Send message wrapper
    async send(message: string) {
        this.ws.send(message);
    }

    // Subscribe to event
    async subscribeToEvent(event: EventName, callback: (event: BedrockEvent) => void) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);

        logger('Subscribed to ' + event, this.serverId);

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

        logger('Unsubscribed from ' + event, this.serverId);

        // Remove event
        delete this.events[event];
    }

    // Send command message
    async sendCommandMessage<T,R>(commandMessage: T): Promise<R> {
        logger('CommandMessage sent: ' + JSON.stringify(commandMessage), this.serverId);
        await this.send(JSON.stringify(commandMessage));

        const comandUUID: string = (<CommandRequestMessage>commandMessage).getUUID();

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

    // Gamemode command
    async gamemodeCommand(gamemode: string, player: string): Promise<GamemodeCommandResponseMessage> {
        const gamemodeCommand: CommandRequestMessage = new CommandRequestMessage(`gamemode ${gamemode} ${player}`);
        const gamemodeResponse: GamemodeCommandResponseMessage = await this.sendCommandMessage<CommandRequestMessage, GamemodeCommandResponseMessage>(gamemodeCommand);
        return new GamemodeCommandResponseMessage(gamemodeResponse);
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

    // Tell command
    async tellCommand(player: string, message: string): Promise<TellCommandResponseMessage> {
        const tellCommand: CommandRequestMessage = new CommandRequestMessage(`tell ${player} ${message}`);
        const tellResponse: TellCommandResponseMessage = await this.sendCommandMessage<CommandRequestMessage, TellCommandResponseMessage>(tellCommand);
        return new TellCommandResponseMessage(tellResponse);
    }
}
