package commands

import (
	"encoding/json"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
	mctypes "github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/types"
)

// tp <destination: target>
// tp <destination: x y z>
// tp <target: target> <destination: x y z>
// tp <target: target> <destination: target>

// NewTeleportRequest - Sends a teleport request
func NewTeleportRequest(destination string) *protocol.Packet {
	return NewCommandPacket("tp " + destination)
}

// NewTeleportRequestWithCoordinates - Sends a teleport request with coordinates
func NewTeleportRequestWithCoordinates(target string, x, y, z float64) *protocol.Packet {
	return NewCommandPacket("tp " + target + " " + Float64ToString(x) + " " + Float64ToString(y) + " " + Float64ToString(z))
}

// NewTeleportRequestWithTarget - Sends a teleport request with a target
func NewTeleportRequestWithTarget(target, destination string) *protocol.Packet {
	return NewCommandPacket("tp " + target + " " + destination)
}

// TeleportResponseBody - The body of a teleport response
type TeleportResponseBody struct {
	*protocol.Body
	Destination mctypes.Position `json:"destination"`
	Victim      []string         `json:"victim"`
}

// TeleportResponse - The body of a teleport response
type TeleportResponse struct {
	*protocol.Packet
	Body TeleportResponseBody `json:"body"`
}

// HandleTeleport - Handle a teleport response
func HandleTeleport(id string, msg []byte, packetJSON map[string]interface{}) {
	teleport := &TeleportResponse{}
	err := json.Unmarshal(msg, teleport)
	if err != nil {
		return
	}
	log.Printf("[%s] Command /tp: %v -> %v", id, teleport.Body.Victim, teleport.Body.Destination)
}
