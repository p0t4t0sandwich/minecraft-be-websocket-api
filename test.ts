import WebSocket from "ws";

const ws = new WebSocket('ws://0.0.0.0:4005/test');
// const ws = new WebSocket('wss://b9c6-2620-ae-0-3548-dddd-00-5f8b.ngrok-free.app/ngrok');

ws.on('error', console.error);

ws.on('open', function open() {
    ws.send(JSON.stringify('connected'));
});

ws.on('message', function message(data) {
    console.log('received: %s', data);
});
