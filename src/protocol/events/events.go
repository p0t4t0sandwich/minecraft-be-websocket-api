package events

import (
	"log"

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
	Header EventHeader `json:"header"`
}

// HandleEvent - Handle an event packet
func HandleEvent(id string, msg []byte, packetJSON map[string]interface{}, event *EventPacket) {
	switch event.Header.EventName {
	case BlockBroken:
		HandleBlockBroken(id, event)
	case BlockPlaced:
		HandleBlockPlaced(id, event)
	case ItemUsed:
		HandleItemUsed(id, event)
	case PlayerJoin:
		HandlePlayerJoin(id, event)
	case PlayerLeave:
		HandlePlayerLeave(id, event)
	case PlayerMessage:
		HandlePlayerMessage(id, event)
	case PlayerTransform:
		HandlePlayerTransform(id, event)
	case PlayerTravelled:
		HandlePlayerTravelled(id, event)
	default:
		log.Printf("[%s] [Event] %s", id, event.Header.EventName)
		log.Println(string(msg))
	}
}
