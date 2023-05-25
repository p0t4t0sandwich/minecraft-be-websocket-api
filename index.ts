import { WebSocketServer } from "ws";



// Web Sockets
let webSockets = {};

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

    ws.on('message', async (message: string) => {
        try {
            if (message == "ping" || message == "pong") return;

            // console.log('Received from ' + userID);

            //
            console.log('Received from ' + userID + ': ' + message);
            //

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
