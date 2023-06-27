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

async function logger(message: string, level: string = "info", logPath: string = 'logs') {
    // Get today's date
    const today = new Date();
    const parsedDateTime = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    // Message string
    const messageToLog = `[${today.toISOString()}] [${level}]: ${message}`;

    if (fs.existsSync(logPath) === false) {
        await fs.promises.mkdir(logPath);
    }

    // Save to log file
    fs.promises.appendFile(`logs/${parsedDateTime}.log`, messageToLog + '\n');

    console.log(messageToLog);
}

function sendDiscordWebhook(title: string, description: string, webhookUrl: string = process.env.DISCORD_WEBHOOK_URL): void {
    // Check if webhook URL is defined
    if (webhookUrl === undefined) return;

    // Prepare data
    const data = {
        "content": null,
        "embeds": [
            {
                "title": title,
                "description": description
            }
        ]
    };

    // Send webhook
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(() => {
        logger(`Sent Discord webhook: ${title}`);
    }).catch((error) => {
        logger(`Error sending Discord webhook: ${error}`);
    });
}

export { getIpAddress, logger, sendDiscordWebhook };
