package events

import (
	"encoding/json"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/mctypes"
)

// BlockBrokenBody The body of a block broken event
type BlockBrokenBody struct {
	Block             mctypes.Block  `json:"block"`
	Count             int            `json:"count"`
	DestructionMethod int            `json:"destructionMethod"`
	Player            mctypes.Player `json:"player"`
	Tool              mctypes.Tool   `json:"tool"`
	Varient           int            `json:"varient"`
}

// BlockBrokenEvent Event for when a block is broken
type BlockBrokenEvent struct {
	*EventPacket
	Body BlockBrokenBody `json:"body"`
}

// HandleBlockBroken Handle the block broken event
//
//goland:noinspection GoUnusedParameter
func HandleBlockBroken(id string, msg []byte, packetJSON map[string]interface{}, event *EventPacket) {
	blockBroken := &BlockBrokenEvent{EventPacket: event}
	body, err := json.Marshal(event.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = json.Unmarshal(body, &blockBroken.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Printf("[%s] [Event] Block broken by %s", id, blockBroken.Body.Player.Name)
}
