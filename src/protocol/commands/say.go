package commands

import (
	"encoding/json"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

// say <message: string>

// NewSayRequest - Sends a say request
func NewSayRequest(message string) *protocol.Packet {
	return NewCommandPacket("say " + message)
}

// SayResponseBody - The body of a say response
type SayResponseBody struct {
	*protocol.Body
	Message string `json:"message"`
}

// SayResponse - The body of a say response
type SayResponse struct {
	*protocol.Packet
	Body SayResponseBody `json:"body"`
}

// HandleSay - Handle a say response
func HandleSay(id string, msg []byte, packetJSON map[string]interface{}, packet *CommandResponse) {
	say := &SayResponse{}
	err := json.Unmarshal(msg, say)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Printf("[%s] Command /say: %s", id, say.Body.Message)
}
