import { v4 as uuidv4 } from 'uuid';

// Header
export interface MessageHeader {
    requestId: string;
    messagePurpose: string;
    messageType: string;
    version: number;
}

// Body
export interface MessageBody {
    [key: string]: any;
}

// Message
export class Message {
    // Properties
    header: MessageHeader = {
        requestId: uuidv4(),
        messagePurpose: "",
        messageType: "",
        version: 1
    };
    body: MessageBody = {};
}
