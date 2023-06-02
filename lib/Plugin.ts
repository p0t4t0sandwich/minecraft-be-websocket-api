// Plugin Class for extending the core functionality of the framework

import { MinecraftWebSocket } from "./MinecraftWebSocket.js";
import { Listener } from "./listeners/Listeners.js";

export class Plugin {
    // Properties
    name: string;
    description: string;
    version: string;
    author: string;

    private listeners: Listener[] = [];
    public mwss: MinecraftWebSocket;

    // Constructor
    constructor() {
        this.name = "Example Plugin";
        this.version = "0.0.1";
        this.description = "An example plugin for MWSS";
    }

    // Methods

    // Get Listeners
    getListeners(): Listener[] {
        return this.listeners;
    }

    // Set Listeners
    setListeners(listeners: Listener[]) {
        this.listeners = listeners;
    }

    // Add Listener
    addListener(listener: Listener) {
        this.listeners.push(listener);
    }

    // Start
    async start(mwss: MinecraftWebSocket) {
        this.mwss = mwss;
        console.log("Plugin started");
    }
}