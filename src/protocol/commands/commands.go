package commands

import (
	"log"
	"strconv"
	"strings"

	"github.com/google/uuid"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

// CommandTextResponse - The body of a command text response message
type CommandTextResponse string

// Command Origin Types
type OriginType string

const (
	OriginTypePlayer OriginType = "player"
)

// CommandOrigin - The origin of a command message
type CommandOrigin struct {
	Type OriginType `json:"type"`
}

// CommandBody - The body of a command message
type CommandBody struct {
	Version     int           `json:"version"`
	Origin      CommandOrigin `json:"origin"`
	CommandLine string        `json:"commandLine"`
}

// NewCommandPacket - Create a new command packet
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

// CommandResponse - The body of a command response message
type CommandResponse struct {
	*protocol.Packet
	Body protocol.Body `json:"body"`
}

// NewCommandResponse - Create a new command response packet
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

// Float64ToString - Converts a float64 to a string
func Float64ToString(f float64) string {
	return strconv.FormatFloat(f, 'f', -1, 64)
}

// HandleCommand - Handle a command packet
func HandleCommand(id string, msg []byte, packetJSON map[string]interface{}, packet *CommandResponse, commandName CommandName) {
	if packet.Body.StatusCode != 0 && commandName != "" {
		packet.Body.StatusMessage = strings.ReplaceAll(packet.Body.StatusMessage, "\n", "\n\t\t")
		log.Printf("[%s] Command %s status %d: %s", id, commandName, packet.Body.StatusCode, packet.Body.StatusMessage)
		return
	}

	switch commandName {
	case Effect:
		HandleEffect(id, msg, packetJSON)
	case GameMode:
		HandleGamemode(id, msg, packetJSON)
	case GlobalPause:
		HandleGlobalPause(id, msg, packetJSON)
	case List:
		HandleList(id, msg, packetJSON)
	case Say:
		HandleSay(id, msg, packetJSON)
	case Summon:
		HandleSummon(id, msg, packetJSON)
	case Teleport:
		HandleTeleport(id, msg, packetJSON)
	case Tell:
		HandleTell(id, msg, packetJSON)
	default:
		log.Println(string(msg))
		if packet.Body.StatusCode != 0 {
			log.Printf("[%s] Command status %d: %s", id, packet.Body.StatusCode, packet.Body.StatusMessage)
		} else {
			log.Printf("[%s] Command response: %s", id, packet.Body.StatusMessage)
		}
	}
}
