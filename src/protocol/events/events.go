package events

import (
	"log"

	"github.com/google/uuid"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

// EventHeader - Adds an event name to the regular header
type EventHeader struct {
	protocol.Header
	EventName EventName `json:"eventName"`
}

// EventPacket - Packet received as an event notification
type EventPacket struct {
	protocol.Packet
	Header *EventHeader `json:"header"`
}

// GetEventListeners - Get the event listeners
func GetEventListeners() map[EventName]func(string, []byte, map[string]interface{}, *EventPacket) {
	return map[EventName]func(string, []byte, map[string]interface{}, *EventPacket){
		BlockBroken:     HandleBlockBroken,
		BlockPlaced:     HandleBlockPlaced,
		ItemUsed:        HandleItemUsed,
		PlayerJoin:      HandlePlayerJoin,
		PlayerLeave:     HandlePlayerLeave,
		PlayerMessage:   HandlePlayerMessage,
		PlayerTransform: HandlePlayerTransform,
		PlayerTravelled: HandlePlayerTravelled,
		Unknown: func(id string, msg []byte, packetJSON map[string]interface{}, packet *EventPacket) {
			log.Printf("[%s] [Event] %s", id, packet.Header.EventName)
			log.Println(string(msg))
		},
	}
}

// EventSubBody - The body of an event message
type EventSubBody struct {
	EventName EventName `json:"eventName"`
}

// EventSubPacket - Packet extension for events
type EventSubPacket struct {
	*protocol.Packet
	Body EventSubBody `json:"body"`
}

// NewEventSubPacket - Create a new message
func NewEventSubPacket(eventName EventName, purpose protocol.MessageType) *protocol.Packet {
	return &protocol.Packet{
		Header: protocol.Header{
			RequestId:      uuid.New(),
			MessagePurpose: purpose,
			MessageType:    protocol.CommandResponseType,
			Version:        1,
		},
		Body: EventSubBody{
			EventName: eventName,
		},
	}
}
