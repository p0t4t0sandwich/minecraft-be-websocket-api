# Minecraft Bedrock Websocket API

An API that utilizes Minecraft Bedrock Edition's (and Minecraft Education Edition's) websocket capabilities to administer commands and listen to in-game events.

## About

This API is a wrapper for Minecraft Bedrock Edition's (and Minecraft Education Edition's) websocket capabilities. It allows you to send commands to the server and listen to events that happen in-game. I'm going further with this and implementing a REST API into the websocket server. This will abstract the websocket protocol and allow you to use the API as if it were a REST API. REST API event callbacks require a callback URL and a listening webserver.

The websocket connects through your client, and the program will share your in-game permissions. This means that you can't use this API to send commands in a game that you're not an admin in.

## Important

You need to disable encrypted web sockets for this to work. There's no way in hell that I'm actually going to implement the monstrosity that is `com.microsoft.minecraft.wsencrypt`. You can find this setting under `Settings` -> `General` -> `Require Encrypted Websockets`.

## Usage

### Connecting to the Websocket from in-game or in a server's console

Note: for some reason you can't run the command from the console, or from in-game. Feel free to submit a PR if you know a workaround.

```
/connect ws://localhost:8080/ws/someid
```

### REST API

#### Send Command

```http
POST /cmd/{id}
```

JSON body:

```json
{
    "cmd": "say Hello World"
}
```

#### Subscribe to an Event

```http
POST /api/event/{id}/{eventName}
```

#### Unsubscribe from an Event

```http
DELETE /api/event/{id}/{eventName}
```

## Resources

### Events

<https://gist.github.com/jocopa3/5f718f4198f1ea91a37e3a9da468675c>

<https://github.com/MisteFr/minecraft-bedrock-documentation/blob/master/release/1.12.0.28/1.12.0.28_wssEvents.md>

<https://gist.github.com/jocopa3/54b42fb6361952997c4a6e38945e306f>

### Misc

<https://gist.github.com/pirosuke/1ca2aa4d8920f41dfbabcbc7dc2a669f>

<https://github.com/Sandertv/mcwss/>

<https://github.com/Nathan-Nesbitt/Minecraft_API>

<https://github.com/askvictor/mineclass>

<https://github.com/jocopa3/PEWS-API>

<https://github.com/railsbob/minecraft-wss>
