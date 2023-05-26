import WebSocket from "ws";

const ws = new WebSocket('wss://mc.taterland.ca:4005/test');

ws.on('error', console.error);

ws.on('open', function open() {
    ws.send(JSON.stringify('connected'));
});

ws.on('message', function message(data) {
    console.log('received: %s', data);
});
