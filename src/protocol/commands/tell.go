package commands

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

// tell <player: recipient> <message: string>

// NewTellRequest - Sends a tell request
func NewTellRequest(recipient, message string) *protocol.Packet {
	return NewCommandPacket(fmt.Sprintf("tell %v %v", recipient, message))
}

// TellResponseBody - The body of a tell response
type TellResponseBody struct {
	*protocol.Body
	Message   string   `json:"message"`
	Recipient []string `json:"recipient"`
}

// TellResponse - The body of a tell response
type TellResponse struct {
	*protocol.Packet
	Body TellResponseBody `json:"body"`
}

// HandleTell - Handle a tell response
func HandleTell(id string, msg []byte, packetJSON map[string]interface{}, packet *CommandResponse) {
	tell := &TellResponse{}
	err := json.Unmarshal(msg, tell)
	if err != nil {
		return
	}
	log.Printf("[%s] Command /tell: %s -> %s", id, tell.Body.Recipient, tell.Body.Message)
}
