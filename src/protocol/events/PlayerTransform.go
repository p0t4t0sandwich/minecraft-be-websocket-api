package events

import (
	"encoding/json"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/mctypes"
)

// PlayerTransformBody PlayerTransform event body
type PlayerTransformBody struct {
	Player mctypes.Player `json:"player"`
}

// PlayerTransformEvent PlayerTransform event
type PlayerTransformEvent struct {
	*EventPacket
	Body PlayerTransformBody `json:"body"`
}

// HandlePlayerTransform Handle a PlayerTransform event
//
//goland:noinspection GoUnusedParameter
func HandlePlayerTransform(id string, msg []byte, packetJSON map[string]interface{}, event *EventPacket) {
	playerTransform := &PlayerTransformEvent{EventPacket: event}
	body, err := json.Marshal(event.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = json.Unmarshal(body, &playerTransform.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Printf("[%s] [Event] Player transformed: %s -> %v", id, playerTransform.Body.Player.Name, playerTransform.Body.Player.Position)
}
