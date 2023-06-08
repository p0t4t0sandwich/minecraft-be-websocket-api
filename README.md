# Minecraft Bedrock Websocket API

An API that utilizes Minecraft Bedrock Edition's (and Minecraft Education Edition's) websocket capabilities to administer commands and listen to in-game events.

## About

This API is a wrapper for Minecraft Bedrock Edition's (and Minecraft Education Edition's) websocket capabilities. It allows you to send commands to the server and listen to events that happen in-game. I'm going further with this and implementing a REST API into the websocket server. This will abstract the websocket protocol and allow you to use the API as if it were a REST API. REST API event callbacks require a callback URL and a listening webserver.

The websocket connects through your client, and the program will share your in-game permissions. This means that you can't use this API to send commands in a game that you're not an admin in.

## Important

You need to disable encrypted web sockets for this to work. There's no way in hell that I'm actually going to implement the monstrosity that is `com.microsoft.minecraft.wsencrypt`. You can find this setting under `Settings` -> `General` -> `Require Encrypted Websockets`.

## Usage

### Websocket API

`index.ts`

```typescript
import { MinecraftWebSocket } from "./lib/MinecraftWebSocket.js";

// Import Plugins
import { ExamplePlugin } from "./plugins/ExamplePlugin.js";

async function main() {
    // Minecraft Web Socket
    const WEBSOCKET_PORT: number = <number><unknown>process.env.WEBSOCKET_PORT || 4005;
    const mwss: MinecraftWebSocket = new MinecraftWebSocket(WEBSOCKET_PORT);

    // Minecraft REST API
    const REST_PORT: number = <number><unknown>process.env.REST_PORT || 4006;
    mwss.startRestServer(REST_PORT);

    // Load plugins
    await mwss.loadPlugin(new ExamplePlugin());
}
main();

```

`./plugin/ExamplePlugin.ts`

```typescript
import { BedrockServer } from "../lib/BedrockServer.js";
import { MinecraftWebSocket } from "../lib/MinecraftWebSocket.js";
import { Plugin } from "../lib/Plugin.js";
import { BedrockEvent, EventName, PlayerMessageEvent } from "../lib/events/Events.js";

export class ExamplePlugin extends Plugin {
    // Constructor
    constructor() {
        // Set plugin info
        super(
            "Example Plugin",
            "An example plugin for MWSS.",
            "1.0.0",
            "p0t4t0sandwich"
        );

        // Set listeners
        this.setListeners([
            {
                eventName: EventName.PlayerMessage,
                callback: async (event: PlayerMessageEvent) => {
                    const playerName: string = event.body.sender;
                    const message: string = event.body.message;
                    const server: BedrockServer = this.mwss.getServer(event.server);
        
                    // Ignore messages from the websocket server
                    if (event.body.sender == "Teacher") return
        
                    await server.sendCommand(`say ${playerName} said ${message}`);
                }
            }
        ]);
    }

    // Methods

    // Start
    async start(mwss: MinecraftWebSocket) {
        this.mwss = mwss;
        console.log("Example plugin started!");
    }
}
```

### REST API

#### Send Command

URL encoded query/slug parameters:

```http
POST /command/:server?command=say Hello World!
POST /command?server=ServerName&command=say Hello World!
```

JSON body:

```json
{
    "server": "ServerName",
    "command": "say Hello World!"
}
```

JSON response:

```json
{
    "header": {
        "requestId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "messagePurpose": "commandResponse",
        "version": 1
    },
    "body": {
        "message": "Hello World!",
        "statusCode": 0
    }
}
```

#### Subscribe to an Event

URL encoded query/slug parameters:

```http
POST /event/:server?eventName=PlayerMessage?callback_uri=http://localhost:4000/event
POST /event?server=ServerName&eventName=PlayerMessage?callback_uri=http://localhost:4000/event
```

JSON body:

```json
{
    "server": "ServerName",
    "eventName": "PlayerMessage",
    "callback_uri": "http://localhost:4000/event"
}
```

JSON response:

```json
{
    "message": "Subscribed to PlayerMessage",
}
```

#### Unsubscribe from an Event

URL encoded query/slug parameters:

```http
DELETE /event/:server?eventName=PlayerMessage?callback_uri=http://localhost:4000/event
DELETE /event?server=ServerName&eventName=PlayerMessage?callback_uri=http://localhost:4000/event
```

JSON body:

```json
{
    "server": "ServerName",
    "eventName": "PlayerMessage",
    "callback_uri": "http://localhost:4000/event"
}
```

JSON response:

```json
{
    "message": "Unsubscribed from PlayerMessage",
}
```

## TODO

- [x] Build a basic websocket server
- [x] Implement basic websocket protocol for sending commands and listening to events
- [x] Have command feedback be sent back to the method that sent the command
  - [ ] include timeout error
- [x] Implement REST API
- [x] Build SDK for interacting with the API
  - [ ] Set up helper function to set up a simple webserver for event callbacks
- [x] Some sort of sideloading/plugin system?
- [ ] Abstracted custom Command API/simplification of commands

## Resources

### Events

<https://gist.github.com/jocopa3/5f718f4198f1ea91a37e3a9da468675c>

<https://github.com/MisteFr/minecraft-bedrock-documentation/blob/master/release/1.12.0.28/1.12.0.28_wssEvents.md>

<https://gist.github.com/jocopa3/54b42fb6361952997c4a6e38945e306f>

### Misc

<https://gist.github.com/pirosuke/1ca2aa4d8920f41dfbabcbc7dc2a669f>

<https://github.com/Sandertv/mcwss/blob/master/encryption.go#L16>

<https://github.com/Nathan-Nesbitt/Minecraft_API/blob/development/src/minecraft_api.js>

<https://github.com/askvictor/mineclass>

<https://github.com/jocopa3/PEWS-API>

<https://github.com/railsbob/minecraft-wss>
