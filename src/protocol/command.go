package protocol

import "github.com/google/uuid"

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
func NewCommandPacket(command string) *Packet {
	return &Packet{
		Header: Header{
			RequestId:      uuid.New(),
			MessagePurpose: CommandRequestType,
			MessageType:    CommandRequestType,
			Version:        1,
		},
		Body: CommandBody{
			Version:     1,
			Origin:      CommandOrigin{Type: OriginTypePlayer},
			CommandLine: command,
		},
	}
}

// CommandResponseBody - The body of a command response message
type CommandResponseBody struct {
	Message       string `json:"message,omitempty"`
	StatusCode    int    `json:"statusCode"`
	StatusMessage string `json:"statusMessage,omitempty"`
}

// CommandResponse - The body of a command response message
type CommandResponse struct {
	Packet
	Body CommandResponseBody `json:"body"`
}

// NewCommandResponse - Create a new command response packet
func NewCommandResponse(packet *Packet) *CommandResponse {
	bodyMap := packet.Body.(map[string]interface{})
	if _, ok := bodyMap["message"]; !ok {
		bodyMap["message"] = ""
	}
	if _, ok := bodyMap["statusMessage"]; !ok {
		bodyMap["statusMessage"] = ""
	}

	return &CommandResponse{
		Packet: *packet,
		Body: CommandResponseBody{
			Message:       bodyMap["message"].(string),
			StatusCode:    bodyMap["statusCode"].(int),
			StatusMessage: bodyMap["statusMessage"].(string),
		},
	}
}
