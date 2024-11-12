package events

import (
	"encoding/json"
	"log"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/mctypes"
)

// BlockPlacedBody The body of a block placed event
type BlockPlacedBody struct {
	Block            mctypes.Block  `json:"block"`
	Count            int            `json:"count"`
	PlacedUnderwater bool           `json:"placedUnderwater"`
	PlacementMethod  int            `json:"placementMethod"`
	Player           mctypes.Player `json:"player"`
	Tool             mctypes.Tool   `json:"tool"`
}

// BlockPlacedEvent Event for when a block is placed
type BlockPlacedEvent struct {
	*EventPacket
	Body BlockPlacedBody `json:"body"`
}

// HandleBlockPlaced Handle the block placed event
//
//goland:noinspection GoUnusedParameter
func HandleBlockPlaced(id string, msg []byte, packetJSON map[string]interface{}, event *EventPacket) {
	blockPlaced := &BlockPlacedEvent{EventPacket: event}
	body, err := json.Marshal(event.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = json.Unmarshal(body, &blockPlaced.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Printf("[%s] [Event] Block placed by %s", id, blockPlaced.Body.Player.Name)
}
