package commands

import (
	"encoding/json"
	"fmt"
	"log"
	"strings"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

// kill <entity: target>[params]

// NewKillRequest - Sends an kill request
func NewKillRequest(target string, params ...string) *protocol.Packet {
	command := fmt.Sprintf("kill %v", target)
	if len(params) > 0 {
		command = fmt.Sprintf("%v %v", command, strings.Join(params, " "))
	}
	return NewCommandPacket(command)
}

// KillResponseBody - The body of an kill response
type KillResponseBody struct {
	*protocol.Body
	TargetName []string `json:"targetname"`
}

// KillResponse - The body of an kill response
type KillResponse struct {
	*protocol.Packet
	Body KillResponseBody `json:"body"`
}

// HandleKill - Handle an kill response
func HandleKill(id string, msg []byte, packetJSON map[string]interface{}, packet *CommandResponse) {
	kill := &KillResponse{}
	err := json.Unmarshal(msg, kill)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Printf("[%s] Command /kill: %s", id, kill.Body.StatusMessage)
}
