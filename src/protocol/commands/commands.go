package commands

import (
	"log"
	"strconv"

	"github.com/google/uuid"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

// CommandTextResponse The body of a command text response message
type CommandTextResponse string

// OriginType Command Origin Types
type OriginType string

const (
	OriginTypePlayer OriginType = "player"
)

// CommandOrigin The origin of a command message
type CommandOrigin struct {
	Type OriginType `json:"type"`
}

// CommandBody The body of a command message
type CommandBody struct {
	Version     int           `json:"version"`
	Origin      CommandOrigin `json:"origin"`
	CommandLine string        `json:"commandLine"`
}

// NewCommandPacket Create a new command packet
func NewCommandPacket(command string) *protocol.Packet {
	return &protocol.Packet{
		Header: protocol.Header{
			RequestId:      uuid.New(),
			MessagePurpose: protocol.CommandRequestType,
			MessageType:    protocol.CommandRequestType,
			Version:        1,
		},
		Body: CommandBody{
			Version:     1,
			Origin:      CommandOrigin{Type: OriginTypePlayer},
			CommandLine: command,
		},
	}
}

// CommandResponse The body of a command response message
type CommandResponse struct {
	*protocol.Packet
	Body protocol.Body `json:"body"`
}

// NewCommandResponse Create a new command response packet
//
//goland:noinspection GoUnusedExportedFunction
func NewCommandResponse(packet *protocol.Packet) *CommandResponse {
	bodyMap := packet.Body.(map[string]interface{})
	if _, ok := bodyMap["statusMessage"]; !ok {
		bodyMap["statusMessage"] = ""
	}

	return &CommandResponse{
		Packet: packet,
		Body: protocol.Body{
			StatusCode:    bodyMap["statusCode"].(int),
			StatusMessage: bodyMap["statusMessage"].(string),
		},
	}
}

// Float64ToString Converts a float64 to a string
func Float64ToString(f float64) string {
	return strconv.FormatFloat(f, 'f', -1, 64)
}

// GetCommandListeners Handle a command packet
func GetCommandListeners() map[CommandName]func(string, []byte, map[string]interface{}, *CommandResponse) {
	return map[CommandName]func(string, []byte, map[string]interface{}, *CommandResponse){
		Effect:      HandleEffect,
		GameMode:    HandleGamemode,
		GlobalPause: HandleGlobalPause,
		Kill:        HandleKill,
		List:        HandleList,
		Say:         HandleSay,
		Summon:      HandleSummon,
		Teleport:    HandleTeleport,
		Tell:        HandleTell,
		Unknown: func(id string, msg []byte, packetJSON map[string]interface{}, packet *CommandResponse) {
			log.Println(string(msg))
			if packet.Body.StatusCode != 0 {
				log.Printf("[%s] Command status %d: %s", id, packet.Body.StatusCode, packet.Body.StatusMessage)
			} else {
				log.Printf("[%s] Command response: %s", id, packet.Body.StatusMessage)
			}
		},
	}
}
