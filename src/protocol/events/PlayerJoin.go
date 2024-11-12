package events

import (
	"encoding/json"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/mctypes"
)

// PlayerJoinBody The body of a player join event
type PlayerJoinBody struct {
	Player mctypes.Player `json:"player"`
}

// PlayerJoinEvent Event for when a player joins
type PlayerJoinEvent struct {
	*EventPacket
	Body PlayerJoinBody `json:"body"`
}

// HandlePlayerJoin Handle the player join event
//
//goland:noinspection GoUnusedParameter
func HandlePlayerJoin(id string, msg []byte, packetJSON map[string]interface{}, event *EventPacket) {
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
