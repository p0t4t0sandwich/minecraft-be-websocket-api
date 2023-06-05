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


// Web Sockets
const WEBSOCKET_PORT: number = <number><unknown>process.env.WEBSOCKET_PORT || 4005;

// Minecraft Web Socket
export const mwss: MinecraftWebSocket = new MinecraftWebSocket(WEBSOCKET_PORT);

// Import listeners from plugin
import { listeners } from "./plugins/ExamplePlugin.js";

await mwss.loadListeners(listeners);

```

`./plugin/ExamplePlugin.ts`

```typescript
import { mwss } from "../index.js";
import { EventName, PlayerMessageEvent } from "../lib/Events.js";
import { Listener } from "../lib/Listeners.js";

export const listeners: Listener[] = [
    {
        eventName: EventName.PlayerMessage,
        callback: async (event: PlayerMessageEvent) => {
            const playerName: string = event.body.sender;
            const message: string = event.body.message;

            // Ignore messages from the websocket server
            if (event.body.sender == "Teacher") return

            await mwss.sendCommand(event.server, `say ${playerName} said ${message}`);
        }
    }
]
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
- [ ] Build SDK for interacting with the API
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
