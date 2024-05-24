package protocol

import "github.com/google/uuid"

// Packet - General packet structure
type Packet struct {
	Header Header      `json:"header"`
	Body   interface{} `json:"body"`
}

// Header - The header of a message
type Header struct {
	RequestId      uuid.UUID   `json:"requestId"`
	MessagePurpose MessageType `json:"messagePurpose"`
	MessageType    MessageType `json:"messageType"`
	Version        int         `json:"version"`
}

// MessageType - The type of a message
type MessageType string

const (
	CommandRequestType  MessageType = "commandRequest"
	CommandResponseType MessageType = "commandResponse"
	EventType           MessageType = "event"
	ErrorType           MessageType = "error"
	SubscribeType       MessageType = "subscribe"
	UnsubscribeType     MessageType = "unsubscribe"
)

// header.messagePurpose = "error"
// ErrorBody - The body of an error message
type Body struct {
	StatusCode    int    `json:"statusCode"`
	StatusMessage string `json:"statusMessage"`
}
