package protocol

import "github.com/google/uuid"

// Packet General packet structure
type Packet struct {
	Header Header      `json:"header"`
	Body   interface{} `json:"body"`
}

// Header The header of a message
type Header struct {
	RequestId      uuid.UUID   `json:"requestId"`
	MessagePurpose MessageType `json:"messagePurpose"`
	MessageType    MessageType `json:"messageType"`
	Version        int         `json:"version"`
}

// MessageType The type of message
type MessageType string

//goland:noinspection GoUnusedConst
const (
	CommandRequestType  MessageType = "commandRequest"
	CommandResponseType MessageType = "commandResponse"
	EventType           MessageType = "event"
	ErrorType           MessageType = "error"
	SubscribeType       MessageType = "subscribe"
	UnsubscribeType     MessageType = "unsubscribe"
)

// Body The body of a message
type Body struct {
	StatusCode    int    `json:"statusCode"`
	StatusMessage string `json:"statusMessage"`
}
