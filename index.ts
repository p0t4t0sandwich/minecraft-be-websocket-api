import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from 'uuid';



// Web Sockets
let webSockets = {};
let subscribeEvents = {};

const WEBSOCKET_PORT: number = <number><unknown>process.env.WEBSOCKET_PORT || 4005;

export const wss: WebSocketServer = new WebSocketServer({ port: WEBSOCKET_PORT }, () => {
    console.log(`MC BE Management Web Socket running on port ${WEBSOCKET_PORT}`);
});

// Web Socket events
wss.on('connection', (ws, req) => {
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true });

    var url = req.url;
    var userID = url.slice(1);
    webSockets[userID] = ws;
    console.log('Connected: ' + userID);

    // Test events
    if (!subscribeEvents['BlockBroken']) {
        console.log(`Subscribing ${userID} to BlockBroken`);
        onPlayerMessage((res: any) => {
            console.log(res);
            
            const message = res.body.sender + ' said: ' + res.body.message;
            sendCommand(userID,`tellraw @a {"rawtext":[{"text":"${message}"}]}`);
        });
    }

    ws.on('message', async (message: string) => {
        try {
            if (message == "ping" || message == "pong") return;

            // console.log('Received from ' + userID);

            //
            console.log('Received from ' + userID + ': ' + message);

            const res = JSON.parse(message);
            if (res.header.messagePurpose === 'event') {
                // Handle subscribed events
                const eventName = res.header.eventName;
                if (subscribeEvents[eventName]) {
                    subscribeEvents[eventName].forEach((callback: Function) => {
                        callback(res);
                    });
                }

                console.log('Received event: ' + eventName);
            }

            let json = JSON.parse(message);
        } catch (err) {
            console.log(err);
            console.log('Invalid JSON: ', message);
        }
    });

    ws.on('close', () => {
        delete webSockets[userID]
        console.log('Disconnected: ' + userID)
    });
});


// Keep alive ping/pong
const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            return ws.terminate();
        }

        ws.isAlive = false
        ws.ping(() => { ws.send("ping"); })
    })
}, 30000);

// PlayerMessage

async function websocketSend(beClient: string, message: string) {
    if (webSockets[beClient]) {
        webSockets[beClient].send(message);
    }
}

async function subscribeToEvent(beClient: string, event: string, callback: Function) {
    if (!subscribeEvents[event]) subscribeEvents[event] = [];
    subscribeEvents[event].push(callback);

    // Send subscribe message
    const subscribeMessage = {
        "body": {
            "eventName": event
        },
        "header": {
            "requestId": uuidv4(),
            "messagePurpose": "subscribe",
            "version": 1,
            "messageType": "commandRequest"
        }
    };

    websocketSend(beClient, JSON.stringify(subscribeMessage));
}

async function onPlayerMessage(callback: Function) {
    subscribeToEvent('test1', 'PlayerMessage', callback);
}

async function onBlockBroken(callback: Function) {
    subscribeToEvent('test1', 'BlockBroken', callback);
}

async function sendCommand(beClient: string, command: string) {
    const commandMessage = {
        "body": {
            "origin": {
                "type": "player"
            },
            "commandLine": command,
            "version": 1
        },
        "header": {
            "requestId": uuidv4(),
            "messagePurpose": "commandRequest",
            "version": 1,
            "messageType": "commandRequest"
        }
    };

    websocketSend(beClient, JSON.stringify(commandMessage));
}
