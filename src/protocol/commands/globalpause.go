package commands

import (
	"fmt"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

// globalpause [pause: Boolean]

// NewGlobalPauseRequest Sends a global pause request
//
//goland:noinspection GoUnusedExportedFunction
func NewGlobalPauseRequest(pause bool) *protocol.Packet {
	return NewCommandPacket(fmt.Sprintf("globalpause %v", pause))
}

// NewGlobalPauseStateRequestPacket Sends a global pause state request
//
//goland:noinspection GoUnusedExportedFunction
func NewGlobalPauseStateRequestPacket() *protocol.Packet {
	return NewCommandPacket("globalpause")
}

// GlobalPauseResponseBody The body of a global pause response message
type GlobalPauseResponseBody struct {
	*protocol.Body
	IsPaused bool `json:"isPaused"`
}

// GlobalPauseTextResponse The body of a global pause text response message
//
//goland:noinspection GoUnusedConst
const GlobalPauseTextResponse CommandTextResponse = "Set or got pause state"

// GlobalPauseResponse The body of a global pause response message
type GlobalPauseResponse struct {
	*protocol.Packet
	Body GlobalPauseResponseBody `json:"body"`
}

// HandleGlobalPause Handle a global pause response
//
//goland:noinspection GoUnusedParameter
func HandleGlobalPause(id string, msg []byte, packetJSON map[string]interface{}, packet *CommandResponse) {
	body := packetJSON["body"].(map[string]interface{})
	if isPaused, ok := body["isPaused"].(bool); ok {
		log.Printf("[%s] Command /globalpause: Global pause state is %t", id, isPaused)
	} else {
		log.Printf("[%s] Command /globalpause: %s", id, body["statusMessage"])
	}
}
