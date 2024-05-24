package commands

import (
	"fmt"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

// globalpause [pause: Boolean]

// NewGlobalPauseRequestPacket - Sends a global pause request
func NewGlobalPauseRequestPacket(pause bool) *protocol.Packet {
	return NewCommandPacket(fmt.Sprintf("globalpause %v", pause))
}

// NewGlobalPauseStateRequestPacket - Sends a global pause state request
func NewGlobalPauseStateRequestPacket() *protocol.Packet {
	return NewCommandPacket("globalpause")
}

// GlobalPauseResponseBody - The body of a global pause response message
type GlobalPauseResponseBody struct {
	IsPaused bool `json:"isPaused"`
}

// GlobalPauseTextResponse - The body of a global pause text response message
const GlobalPauseTextResponse CommandTextResponse = "Set or got pause state"

// GlobalPauseResponse - The body of a global pause response message
type GlobalPauseResponse struct {
	*protocol.Packet
	Body GlobalPauseResponseBody `json:"body"`
}
