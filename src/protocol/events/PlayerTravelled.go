package events

import (
	"encoding/json"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/mctypes"
)

// PlayerTravelledBody - PlayerTravelled event body
type PlayerTravelledBody struct {
	IsUnderWater    bool           `json:"isUnderWater"`
	MetersTravelled float64        `json:"metersTravelled"`
	NewBiome        int            `json:"newBiome"`
	Player          mctypes.Player `json:"player"`
	TravelMethod    int            `json:"travelMethod"`
}

// PlayerTravelledEvent - PlayerTravelled event
type PlayerTravelledEvent struct {
	*EventPacket
	Body PlayerTravelledBody `json:"body"`
}

// HandlePlayerTravelled - Handle a PlayerTravelled event
func HandlePlayerTravelled(id string, event *EventPacket) {
	playerTravelled := &PlayerTravelledEvent{EventPacket: event}
	body, err := json.Marshal(event.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = json.Unmarshal(body, &playerTravelled.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Printf("[%s] [Event] Player travelled: %s -> %v", id, playerTravelled.Body.Player.Name, playerTravelled.Body.MetersTravelled)
}
