import express, { Express, Request, Response, Router } from 'express';
import { MinecraftWebSocket } from './MinecraftWebSocket.js';
import { CommandResponseMessage } from './messages/CommandMessage.js';
import { BedrockServer } from './BedrockServer.js';
import { EventName, BedrockEvent } from "./events/BedrockEvent.js"
import { logger, sendDiscordWebhook } from './utils.js';


export const DOMAIN: string = <string>process.env.DOMAIN || "https://api.sperrer.ca";
export const ROOT_ENDPOINT: string = <string>process.env.ROOT_ENDPOINT || "/api/v1/minecraft-be-websocket-api";


export class MinecraftRESTServer {
    // Properties
    private ip: string = "";
    private port: number;
    private router: Router;
    private app: Express;
    private mwss: MinecraftWebSocket;

    // Constructor
    constructor(REST_PORT: number, mwss: MinecraftWebSocket) {
        this.ip = mwss.getIpAddress();
        this.port = REST_PORT;
        this.router = Router();
        this.app = express();
        this.mwss = mwss;

        // Configure Express
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use("", this.router);

        // Default route
        this.router.get('/', this.defaultRoute.bind(this));

        // Send command
        this.router.post('/command', this.sendCommand.bind(this));
        this.router.post('/command/:server', this.sendCommand.bind(this));

        // Subscribe to event
        this.router.post('/event', this.subscribeToEvent.bind(this));
        this.router.post('/event/:server', this.subscribeToEvent.bind(this));

        // Unsubscribe from event
        this.router.delete('/event', this.unsubscribeFromEvent.bind(this));
        this.router.delete('/event/:server', this.unsubscribeFromEvent.bind(this));

        // Start webserver
        this.app.listen(this.port, () => {
            logger(`MC BE Management REST API running at http://${this.ip}:${REST_PORT}`);
            // sendDiscordWebhook('MC BE Management REST API', `Running at http://${this.ip}:${REST_PORT}`);
        });
    }

    // Methods

    // Send callback
    async sendCallback(endpoint: string, event: BedrockEvent): Promise<void> {
        try {
            // Send event to endpoint
            await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            });
        } catch (err) {
            logger(err);
        }
    }

    // Routes

    // Default route
    async defaultRoute(req: Request, res: Response, next: Function): Promise<void>  {
        try {
            res.type("text/html")
                .status(200)
                .send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Minecraft Bedrock Websocket API</title>
                    <style>
                        body {
                            font-family: Arial, Helvetica, sans-serif;
                        }
                    </style>
                </head>
                <body>
                    <h1>Minecraft Bedrock Websocket API</h1>
                    <a href="https://github.com/p0t4t0sandwich/minecraft-be-websocket-api">GitHub Repository (more documentation here)</a>
                    <br>
                    <p>Send Command: </p>
                    <a href="${DOMAIN}${ROOT_ENDPOINT}/command">POST ${DOMAIN}${ROOT_ENDPOINT}/command</a>
                    <br>
                    <p>Subscribe to Event: </p>
                    <a href="${DOMAIN}${ROOT_ENDPOINT}/event">POST ${DOMAIN}${ROOT_ENDPOINT}/event</a>
                    <br>
                    <p>Unsubscribe from Event: </p>
                    <a href="${DOMAIN}${ROOT_ENDPOINT}/event">DELETE ${DOMAIN}${ROOT_ENDPOINT}/event</a>
                </body>
                </html>
                `);

        // Serverside error response
        } catch (err) {
            logger(err);
            res.type("application/json")
                .status(500)
                .json({ "message": "Internal Server Error", "error": err });
        }
    }

    // Send command
    async sendCommand(req: Request, res: Response, next: Function): Promise<void> {
        try{
            // Invalid request body; server required
            const serverName: string = req.params.server || req.body.server || req.query.server;
            const server: BedrockServer = this.mwss.getServer(serverName);
            if (!serverName || !server) {
                res.type("application/json")
                    .status(400)
                    .json({ "message": "Bad Request", "error": "Server required, or server does not exist" });
                return;
            }

            // Invalid request body; command required
            const command = req.body.command || req.query.command;
            if (!command) {
                res.type("application/json")
                    .status(400)
                    .json({ "message": "Bad Request", "error": "Command required" });
                return;
            }

            // Send command
            const commandResponse: CommandResponseMessage = await server.sendCommand(command);
            res.type("application/json")
                .status(200)
                .send(commandResponse);

        // Serverside error response
        } catch (err) {
            logger(err);
            res.type("application/json")
                .status(500)
                .json({ "message": "Internal Server Error", "error": err });
        }
    }

    // Subscribe to event
    async subscribeToEvent(req: Request, res: Response, next: Function): Promise<void> {
        try{
            // Invalid request body; server required
            const serverName: string = req.params.server || req.body.server || req.query.server;
            const server: BedrockServer = this.mwss.getServer(serverName);
            if (!serverName || !server) {
                res.type("application/json")
                    .status(400)
                    .json({ "message": "Bad Request", "error": "Server required, or server does not exist" });
                return;
            }

            // Invalid request body; event required
            const event: EventName = req.body.event || req.query.event;
            if (!event) {
                res.type("application/json")
                    .status(400)
                    .json({ "message": "Bad Request", "error": "Event required" });
                return;
            }

            // Invalid request body; callback_uri required
            const callback_uri: string = req.body.callback_uri || req.query.callback_uri;

            // Subscribe to event
            await server.subscribeToEvent(event, (event: BedrockEvent) => {
                this.sendCallback(callback_uri, event);
            });

            res.type("application/json")
                .status(200)
                .send({ "message": `Subscribed to ${event}` });

        // Serverside error response
        } catch (err) {
            logger(err);
            res.type("application/json")
                .status(500)
                .json({ "message": "Internal Server Error", "error": err });
        }
    }

    // Unsubscribe from event
    async unsubscribeFromEvent(req: Request, res: Response, next: Function): Promise<void> {
        try{
            // Invalid request body; server required
            const serverName: string = req.params.server || req.body.server || req.query.server;
            const server: BedrockServer = this.mwss.getServer(serverName);
            if (!serverName || !server) {
                res.type("application/json")
                    .status(400)
                    .json({ "message": "Bad Request", "error": "Server required, or server does not exist" });
                return;
            }

            // Invalid request body; event required
            const event: EventName = req.body.event || req.query.event;
            if (!event) {
                res.type("application/json")
                    .status(400)
                    .json({ "message": "Bad Request", "error": "Event required" });
                return;
            }

            // Unsubscribe from event
            await server.unsubscribeFromEvent(event);

            res.type("application/json")
                .status(200)
                .send({ "message": `Unsubscribed from ${event}` });

        // Serverside error response
        } catch (err) {
            logger(err);
            res.type("application/json")
                .status(500)
                .json({ "message": "Internal Server Error", "error": err });
        }
    }
}
