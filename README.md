# Minecraft_BE_API

An API that utilizes Minecraft Bedrock Edition's (and Minecraft Education Edition's) websocket capabilities to administer commands and listen to in-game events.

## About

This API is a wrapper for Minecraft Bedrock Edition's (and Minecraft Education Edition's) websocket capabilities. It allows you to send commands to the server and listen to events that happen in-game. I'm going further with this and implementing a REST API into the websocket server. This will abstract the websocket protocol and allow you to use the API as if it were a REST API. REST API event callbacks require a callback URL and a listening webserver.

## Important

You need to disable encrypted web sockets for this to work. There's no way in hell that I'm actually going to implement the monstrosity that is `com.microsoft.minecraft.wsencrypt`. You can find this setting under `Settings` -> `General` -> `Require Encrypted Websockets`.

## Usage

### Websocket API

```typescript
import { WebSocketServer } from "ws";

import { MinecraftWebSocket } from "./lib/MinecraftWebSocket.js";
import { EventName, PlayerMessageEvent } from "./lib/Events.js";


// Web Sockets
const WEBSOCKET_PORT: number = <number><unknown>process.env.WEBSOCKET_PORT || 4005;

export const wss: WebSocketServer = new WebSocketServer({ port: WEBSOCKET_PORT }, () => {
    console.log(`MC BE Management Web Socket running on port ${WEBSOCKET_PORT}`);
});


// Minecraft Web Socket
const mwss: MinecraftWebSocket = new MinecraftWebSocket(wss);

// Add PlayerMessage Event listener
await mwss.on(EventName.PlayerMessage, async (event: PlayerMessageEvent) => {
    // Ignore messages from the websocket server
    if (event.body.sender == "Teacher") return

    await mwss.sendCommand(event.server, `tellraw @a {"rawtext":[{"text":"${event.body.sender} said: ${event.body.message}"}]}`);
});

// Or, load listeners from an array (eg. from another file)
await mwss.loadListeners([
    {
        eventName: EventName.PlayerMessage,
        callback: async (event: PlayerMessageEvent) => {
            // Ignore messages from the websocket server
            if (event.body.sender == "Teacher") return
            
            await mwss.sendCommand(event.server, `tellraw @a {"rawtext":[{"text":"${event.body.sender} said: ${event.body.message}"}]}`);
        }
    }
]);

// Start the websocket server
await mwss.start();
```

## TODO

- [x] Build a basic websocket server
- [x] Implement basic websocket protocol for sending commands and listening to events
- [ ] Implement REST API
- [ ] Build SDK for interacting with the API
- [x] Some sort of sideloading/plugin system?
- [ ] Extrapolated Command API/simplification of commands

## Resources

### Promising example implementaion

<https://github.com/railsbob/minecraft-wss>

### Events

<https://gist.github.com/jocopa3/5f718f4198f1ea91a37e3a9da468675c>

<https://github.com/MisteFr/minecraft-bedrock-documentation/blob/master/release/1.12.0.28/1.12.0.28_wssEvents.md>

<https://gist.github.com/jocopa3/54b42fb6361952997c4a6e38945e306f>

### Misc

<https://gist.github.com/pirosuke/1ca2aa4d8920f41dfbabcbc7dc2a669f>

<https://github.com/Sandertv/mcwss/blob/master/encryption.go#L16>

<https://github.com/Nathan-Nesbitt/Minecraft_API/blob/development/src/minecraft_api.js>

<https://github.com/askvictor/mineclass>
