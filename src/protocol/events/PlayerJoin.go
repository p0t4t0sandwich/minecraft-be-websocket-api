package events

import (
	"encoding/json"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/mctypes"
)

// PlayerJoinBody
type PlayerJoinBody struct {
	Player mctypes.Player `json:"player"`
}

// PlayerJoinEvent
type PlayerJoinEvent struct {
	*EventPacket
	Body PlayerJoinBody `json:"body"`
}

// HandlePlayerJoin
func HandlePlayerJoin(id string, event *EventPacket) {
	playerJoin := &PlayerJoinEvent{EventPacket: event}
	body, err := json.Marshal(event.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = json.Unmarshal(body, &playerJoin.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Printf("[%s] [Event] Player joined: %s", id, playerJoin.Body.Player.Name)
}
