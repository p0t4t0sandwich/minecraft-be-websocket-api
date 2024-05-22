package protocol

import (
	"github.com/google/uuid"
)

// EventSubBody - The body of an event message
type EventSubBody struct {
	EventName string `json:"eventName"`
}

// EventSubPacket - Packet extension for events
type EventSubPacket struct {
	*Packet
	Body EventSubBody `json:"body"`
}

// NewEventSubPacket - Create a new message
func NewEventSubPacket(eventName string, purpose MessageType) *Packet {
	return &Packet{
		Header: Header{
			RequestId:      uuid.New(),
			MessagePurpose: purpose,
			MessageType:    CommandResponseType,
			Version:        1,
		},
		Body: EventSubBody{
			EventName: eventName,
		},
	}
}
