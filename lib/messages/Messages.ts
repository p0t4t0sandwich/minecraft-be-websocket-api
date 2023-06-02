import { v4 as uuidv4 } from 'uuid';

// Header
export interface MessageHeader {
    requestId: string;
    messagePurpose: string;
    messageType?: string;
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

    // Methods
    getUUID(): string {
        return this.header.requestId;
    }
}

// ErrorMessage
interface ErrorMessageBody extends MessageBody {
    statusCode: number;
    statusMessage: string;
}

export class ErrorMessage extends Message {
    body: ErrorMessageBody;

    // Constructor
    constructor(statusCode: number, statusMessage: string) {
        super();
        this.body = {
            statusCode: statusCode,
            statusMessage: statusMessage
        };
        this.header.messagePurpose = "error";
    }
}
