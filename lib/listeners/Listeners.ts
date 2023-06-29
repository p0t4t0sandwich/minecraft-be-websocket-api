import { EventName, BedrockEvent } from "../events/BedrockEvent.js"

interface Listener {
    eventName: EventName;
    callback: (event: BedrockEvent) => void;
}

export { Listener }
