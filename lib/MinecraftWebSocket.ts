import { WebSocket, WebSocketServer } from "ws";

// Imports for loading plugins
import { readdirSync } from "fs";
import path, { join } from "path";
import { fileURLToPath } from 'url';

// Bedrock server import
import { BedrockServer } from "./BedrockServer.js";

// General type imports
import { EventName, BedrockEvent } from "./events/BedrockEvent.js"
import { Listener } from "./listeners/Listeners.js";
import { Plugin } from "./Plugin.js";
import { MinecraftRESTServer } from "./MinecraftRESTServer.js";
import { getIpAddress, logger, sendDiscordWebhook } from "./utils.js";


type BedrockServers = { [key: string]: BedrockServer };

export class MinecraftWebSocket {
    // Parameters
    private ip: string = process.env.IP_ADDRESS || getIpAddress();
    private wss: WebSocketServer;
    private mrest: MinecraftRESTServer;
    private eventListeners: any[] = [];
    private servers: BedrockServers = {};

    constructor(WEBSOCKET_PORT: number) {
        // Create web socket server
        this.wss = new WebSocketServer({ port: WEBSOCKET_PORT }, () => {
            logger(`MC BE Management Web Socket running at ws://${this.ip}:${WEBSOCKET_PORT}`);
            sendDiscordWebhook('MC BE Management Web Socket', `Running at ws://${this.ip}:${WEBSOCKET_PORT}`);
        });

        // On connection handler
        this.wss.on('connection', this.onConnection.bind(this));
    }

    async onConnection(ws: WebSocket, req: any) {
        const userID: string = req.url.slice(1);

        if (this.servers[userID]) {
            ws.close();
            logger('Duplicate connection: ' + userID);
            return;
        }

        this.servers[userID] = new BedrockServer(userID, ws);
        logger('Connected: ' + userID);

        // Subscribe to events
        for (const eventListener in this.eventListeners) {
            await this.servers[userID].subscribeToEvent(
                this.eventListeners[eventListener].eventName,
                this.eventListeners[eventListener].callback
            );
        }

        // Subscribe to PlayerJoin, PlayerLeave, and PlayerTransform events
        await this.servers[userID].subscribeToEvent(EventName.PlayerJoin, (event: BedrockEvent) => {});
        await this.servers[userID].subscribeToEvent(EventName.PlayerLeave, (event: BedrockEvent) => {});
        await this.servers[userID].subscribeToEvent(EventName.PlayerTransform, (event: BedrockEvent) => {});

        ws.on('close', () => {
            delete this.servers[userID]
            logger('Disconnected: ' + userID)
        });
    }

    // Get server
    getServer(server: string): BedrockServer {
        return this.servers[server];
    }

    // Get server names
    getServerNames(): string[] {
        return Object.keys(this.servers);
    }

    // Get IP address
    getIpAddress(): string {
        return this.ip;
    }

    // Event listener
    async on(eventName: EventName, callback: (event: BedrockEvent) => void) {
        this.eventListeners.push({ eventName: eventName, callback: callback })
    }

    // Load listeners { eventName: EventName, callback: (event: BedrockEvent) => void) }
    async loadListeners(listeners: Listener[]) {
        for (var listener in listeners) {
            this.eventListeners.push(listeners[listener]);
        }
    }

    // Load Plugin
    async loadPlugin(plugin: Plugin) {
        // Load listeners from plugin
        let pluginListeners: Listener[] = plugin.getListeners();

        // Start plugin
        await plugin.start(this);

        // Load listeners into server
        await this.loadListeners(pluginListeners);
    }

    // Load plugins -- Dynamic imports don't work, so I'm benching this for now -- needs a rewrite for the new plugin system
    async loadPlugins(pluginsFolderName: string) {
        // Get path to plugins folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const pluginsDir: string = join(__dirname, "../" + pluginsFolderName);

        // Get plugins
        const plugins: string[] = readdirSync(pluginsDir);

        // Load listeners from plugins
        let pluginListeners: Listener[] = [];
        for (const plugin of plugins) {
            const pluginPath: string = join(pluginsDir, plugin);

            const { listeners } = await import(pluginPath);
            pluginListeners = pluginListeners.concat(listeners);

            logger("Loaded " + pluginListeners.length + " listeners from " + plugin);
        }

        logger("Loaded " + pluginListeners.length + " listeners from " + plugins.length + " plugins");

        // Load listeners into server
        await this.loadListeners(pluginListeners);
    }

    // Start REST server
    startRestServer(REST_PORT: number): MinecraftRESTServer {
        this.mrest = new MinecraftRESTServer(REST_PORT, this);
        return this.mrest;
    }

    // Get REST server
    getRestServer(): MinecraftRESTServer {
        return this.mrest;
    }
}