package commands

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

// gamemode <gameMode: GameMode | int> [player: target]

// NewGamemodeRequest Sends a gamemode request
//
//goland:noinspection GoUnusedExportedFunction
func NewGamemodeRequest(gameMode string, player string) *protocol.Packet {
	return NewCommandPacket(fmt.Sprintf("gamemode %v %v", gameMode, player))
}

// GamemodeResponseBody The body of a gamemode response
type GamemodeResponseBody struct {
	*protocol.Body
	GameMode string   `json:"gameMode"`
	Player   []string `json:"player"`
}

// GamemodeResponse The body of a gamemode response
type GamemodeResponse struct {
	*protocol.Packet
	Body GamemodeResponseBody `json:"body"`
}

// HandleGamemode Handle a gamemode response
//
//goland:noinspection GoUnusedParameter
func HandleGamemode(id string, msg []byte, packetJSON map[string]interface{}, packet *CommandResponse) {
	gamemode := &GamemodeResponse{}
	err := json.Unmarshal(msg, gamemode)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Printf("[%s] Command /gamemode: %s", id, gamemode.Body.StatusMessage)
}
