package events

import (
	"encoding/json"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/mctypes"
)

// PlayerLeaveBody The body of a player leave event
type PlayerLeaveBody struct {
	Player mctypes.Player `json:"player"`
}

// PlayerLeaveEvent Event for when a player leaves
type PlayerLeaveEvent struct {
	*EventPacket
	Body PlayerLeaveBody `json:"body"`
}

// HandlePlayerLeave Handle the player leave event
//
//goland:noinspection GoUnusedParameter
func HandlePlayerLeave(id string, msg []byte, packetJSON map[string]interface{}, event *EventPacket) {
	playerLeave := &PlayerLeaveEvent{EventPacket: event}
	body, err := json.Marshal(event.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = json.Unmarshal(body, &playerLeave.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Printf("[%s] [Event] Player left: %s", id, playerLeave.Body.Player.Name)
}
