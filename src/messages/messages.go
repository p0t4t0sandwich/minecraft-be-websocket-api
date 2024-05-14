package messages

import "github.com/google/uuid"

type Message struct {
	Server string        `json:"server"`
	Header MessageHeader `json:"header"`
	Body   interface{}   `json:"body"`
}

// MessageHeader - The header of a message
type MessageHeader struct {
	RequestId      uuid.UUID `json:"requestId"`
	MessagePurpose string    `json:"messagePurpose"`
	MessageType    string    `json:"messageType"`
	Version        int       `json:"version"`
}

// header.messagePurpose = "error"
// ErrorMessageBody - The body of an error message
type ErrorMessageBody struct {
	StatusCode    int    `json:"statusCode"`
	StatusMessage string `json:"statusMessage"`
}

// EventBody - The body of an event message
type EventBody struct {
	EventName string `json:"eventName"`
}

// NewMessage - Create a new message
func NewEventMessage(eventName string) *Message {
	return &Message{
		Header: MessageHeader{
			MessagePurpose: "",
			MessageType:    "commandResponse",
			Version:        1,
		},
		Body: EventBody{
			EventName: eventName,
		},
	}
}

// NewEventSubscribeMessage - Create a new event subscribe message
func NewEventSubscribeMessage(eventName string) *Message {
	message := NewEventMessage(eventName)
	message.Header.MessagePurpose = "subscribe"
	return message
}

// NewEventUnsubscribeMessage - Create a new event unsubscribe message
func NewEventUnsubscribeMessage(eventName string) *Message {
	message := NewEventMessage(eventName)
	message.Header.MessagePurpose = "unsubscribe"
	return message
}
