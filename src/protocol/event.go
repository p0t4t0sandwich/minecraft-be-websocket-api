package protocol

import "github.com/google/uuid"

// EventBody - The body of an event message
type EventBody struct {
	EventName string `json:"eventName"`
}

// NewEventPacket - Create a new message
func NewEventPacket(eventName string) *Packet {
	return &Packet{
		Header: Header{
			RequestId:      uuid.New(),
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
func NewEventSubscribeMessage(eventName string) *Packet {
	message := NewEventPacket(eventName)
	message.Header.MessagePurpose = SubscribeType
	return message
}

// NewEventUnsubscribeMessage - Create a new event unsubscribe message
func NewEventUnsubscribeMessage(eventName string) *Packet {
	message := NewEventPacket(eventName)
	message.Header.MessagePurpose = UnsubscribeType
	return message
}
