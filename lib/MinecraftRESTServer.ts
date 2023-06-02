import express, { Express, Request, Response, Router } from 'express';
import { MinecraftWebSocket } from './MinecraftWebSocket.js';

export class MinecraftRESTServer {
    // Properties
    private port: number;
    private router: Router;
    private app: Express;
    private mwss: MinecraftWebSocket;

    // Constructor
    constructor(REST_PORT: number, mwss: MinecraftWebSocket) {
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

        // Start webserver
        this.app.listen(this.port, () => {
            console.log(`MC BE Management REST API running on port ${REST_PORT}`);
        });
    }

    // Methods

    // Default route
    async defaultRoute(req: Request, res: Response, next: Function): Promise<void>  {
        res.send("Hello world!");
    }

    // Send command
    async sendCommand(req: Request, res: Response, next: Function): Promise<void> {
        const server = this.mwss.getServer(req.params.server);
        const command = req.body.command;

        await server.send(command);
        res.send("Command sent!"); // TODO: Get command response mapped properly
    }
}