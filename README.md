# Minecraft_BE_API

An API that utilizes Minecraft Bedrock Edition's websocket capabilities to administer commands and listen to in-game events.

## About

This API is a wrapper for Minecraft Bedrock Edition's websocket capabilities. It allows you to send commands to the server and listen to events that happen in-game. I'm going further with this and implementing a REST API into the websocket server. This will abstract the websocket protocol and allow you to use the API as if it were a REST API. REST API event callbacks require a callback URL and a listening webserver.

## TODO

- [x] Build a basic websocket server
- [ ] Implement basic websocket protocol for sending commands and listening to events
- [ ] Implement REST API
- [ ] Build SDK for interacting with the API

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
