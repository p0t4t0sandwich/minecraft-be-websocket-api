package commands

import (
	"encoding/json"
	"fmt"
	"log"
	"strings"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

// effect <player: target> <effect: Effect> [seconds: int] [amplifier: int] [hideParticles: Boolean]

// NewEffectRequest - Sends an effect request
func NewEffectRequest(target, effect string, seconds, amplifier int, hideParticles bool) *protocol.Packet {
	return NewCommandPacket(fmt.Sprintf("effect %v %v %v %v %v", target, effect, seconds, amplifier, hideParticles))
}

// NewEffectClearRequest - Sends an effect clear request
func NewEffectClearRequest(target, effect string) *protocol.Packet {
	return NewCommandPacket(fmt.Sprintf("effect %v clear %v", target, effect))
}

// EffectResponseBody - The body of an effect response
type EffectResponseBody struct {
	*protocol.Body
	Player    []string `json:"player"`
	Effect    string   `json:"effect,omitempty"`
	Seconds   int      `json:"seconds,omitempty"`
	Amplifier int      `json:"amplifier,omitempty"`
}

// EffectResponse - The body of an effect response
type EffectResponse struct {
	*protocol.Packet
	Body EffectResponseBody `json:"body"`
}

// HandleEffect - Handle an effect response
func HandleEffect(id string, msg []byte, packetJSON map[string]interface{}) {
	effect := &EffectResponse{}
	err := json.Unmarshal(msg, effect)
	if err != nil {
		log.Println(err.Error())
		return
	}
	effect.Body.StatusMessage = strings.ReplaceAll(effect.Body.StatusMessage, "\n", "\n\t\t")
	if effect.Body.Effect == "" {
		log.Printf("[%s] Command /effect: Cleared effect for %s", id, effect.Body.Player)
	} else {
		log.Printf("[%s] Command /effect: %s", id, effect.Body.StatusMessage)
	}
}
