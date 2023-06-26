// Get IP address

import { networkInterfaces } from 'os';

function getIpAddress(): string {
    const nets = networkInterfaces();
    const ipAddresses = {};
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!ipAddresses[name]) {
                    ipAddresses[name] = [];
                }
                ipAddresses[name].push(net.address);
            }
        }
    }

    return Object.values(ipAddresses)[0][0];
}

import fs from 'fs';

async function logger(message: string, logPath: string = 'logs') {
    // Get today's date
    const today = new Date();
    const parsedDateTime = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    // Get datetime
    const datetime = new Date().toISOString()

    // Message string
    const messageToLog = `[${new Date().toLocaleString()}] ${message}`;

    if (fs.existsSync(logPath) === false) {
        await fs.promises.mkdir(logPath);
    }

    // Save to log file
    fs.promises.appendFile(`logs/${parsedDateTime}.log`, messageToLog + '\n');

    console.log(messageToLog);
}

export { getIpAddress, logger };
