package commands

import (
	"encoding/json"
	"log"
	"strings"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

// list

// NewListRequest Sends a list request
//
//goland:noinspection GoUnusedExportedFunction
func NewListRequest() *protocol.Packet {
	return NewCommandPacket("list")
}

// currentPlayerCount: number;
//     maxPlayerCount: number;
//     players: string;

// ListResponseBody The body of a list response
type ListResponseBody struct {
	*protocol.Body
	CurrentPlayerCount int    `json:"currentPlayerCount"`
	MaxPlayerCount     int    `json:"maxPlayerCount"`
	Players            string `json:"players"`
}

// ListResponse The body of a list response
type ListResponse struct {
	*protocol.Packet
	Body ListResponseBody `json:"body"`
}

// GetPlayers Get the players from a list response
func (r *ListResponse) GetPlayers() []string {
	return strings.Split(r.Body.Players, ", ")
}

// HandleList Handle a list response
//
//goland:noinspection GoUnusedParameter
func HandleList(id string, msg []byte, packetJSON map[string]interface{}, packet *CommandResponse) {
	list := &ListResponse{}
	err := json.Unmarshal(msg, list)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Printf("[%s] Command /list: %d/%d players online: %s", id, list.Body.CurrentPlayerCount, list.Body.MaxPlayerCount, list.GetPlayers())
}
