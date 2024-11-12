package events

import (
	"encoding/json"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/mctypes"
)

// ItemUsedBody The body of an item used event
type ItemUsedBody struct {
	Count     int            `json:"count"`
	Item      mctypes.Item   `json:"item"`
	Player    mctypes.Player `json:"player"`
	UseMethod int            `json:"useMethod"`
}

// ItemUsedEvent Event for when an item is used
type ItemUsedEvent struct {
	*EventPacket
	Body ItemUsedBody `json:"body"`
}

// HandleItemUsed Handle the item used event
//
//goland:noinspection GoUnusedParameter
func HandleItemUsed(id string, msg []byte, packetJSON map[string]interface{}, event *EventPacket) {
	itemUsed := &ItemUsedEvent{EventPacket: event}
	body, err := json.Marshal(event.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = json.Unmarshal(body, &itemUsed.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Printf("[%s] [Event] Item used by %s", id, itemUsed.Body.Player.Name)
}
