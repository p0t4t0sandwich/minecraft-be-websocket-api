import { BedrockEvent, EventName } from "./Events.js";

export interface Listener {
    eventName: EventName;
    callback: (event: BedrockEvent) => void;
}
