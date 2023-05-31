import { BedrockEvent, EventName } from "../events/Events.js";

export interface Listener {
    eventName: EventName;
    callback: (event: BedrockEvent) => void;
}
