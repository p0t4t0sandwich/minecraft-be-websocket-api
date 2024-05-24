package commands

import (
	"encoding/json"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/mctypes"
)

// summon <entityType: string> <destination: string>

// NewSummonRequest - Sends a summon request
func NewSummonRequest(entityType string, destination string) *protocol.Packet {
	return NewCommandPacket("summon " + entityType + " " + destination)
}

// NewSummonRequestWithCoordinates - Sends a summon request with coordinates
func NewSummonRequestWithCoordinates(entityType string, x, y, z float64) *protocol.Packet {
	return NewCommandPacket("summon " + entityType + " " + Float64ToString(x) + " " + Float64ToString(y) + " " + Float64ToString(z))
}

// SummonResponseBody - The body of a summon response
type SummonResponseBody struct {
	*protocol.Body
	EntityType string           `json:"entityType"`
	SpawnPos   mctypes.Position `json:"spawnPos"`
}

// SummonResponse - The body of a summon response
type SummonResponse struct {
	*protocol.Packet
	Body SummonResponseBody `json:"body"`
}

// HandleSummon - Handle a summon response
func HandleSummon(id string, msg []byte, packetJSON map[string]interface{}) {
	summon := &SummonResponse{}
	err := json.Unmarshal(msg, summon)
	if err != nil {
		return
	}
	log.Printf("[%s] Command /summon: %s -> %v", id, summon.Body.EntityType, summon.Body.SpawnPos)
}
