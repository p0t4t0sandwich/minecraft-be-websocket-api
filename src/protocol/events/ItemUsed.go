package events

import (
	"encoding/json"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/mctypes"
)

// ItemUsedBody
type ItemUsedBody struct {
	Count     int            `json:"count"`
	Item      mctypes.Item   `json:"item"`
	Player    mctypes.Player `json:"player"`
	UseMethod int            `json:"useMethod"`
}

// ItemUsedEvent
type ItemUsedEvent struct {
	*EventPacket
	Body ItemUsedBody `json:"body"`
}

// HandleItemUsed
func HandleItemUsed(id string, event *EventPacket) {
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
