package events

import (
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
	mctypes "github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/types"
)

// EventHeader - Adds an event name to the regular header
type EventHeader struct {
	protocol.Header
	EventName EventName `json:"eventName"`
}

// EventPacket - Packet received as an event notification
type EventPacket struct {
	protocol.Packet
	Header EventHeader `json:"header"`
}

// BlockBrokenBody
type BlockBrokenBody struct {
	Block             mctypes.Block  `json:"block"`
	Count             int            `json:"count"`
	DestructionMethod int            `json:"destructionMethod"`
	Player            mctypes.Player `json:"player"`
	Tool              mctypes.Tool   `json:"tool"`
	Varient           int            `json:"varient"`
}

// BlockBrokenEvent
type BlockBrokenEvent struct {
	*EventPacket
	Body BlockBrokenBody `json:"body"`
}

// BlockPlacedBody
type BlockPlacedBody struct {
	Block            mctypes.Block  `json:"block"`
	Count            int            `json:"count"`
	PlacedUnderwater bool           `json:"placedUnderwater"`
	PlacementMethod  int            `json:"placementMethod"`
	Player           mctypes.Player `json:"player"`
	Tool             mctypes.Tool   `json:"tool"`
}

// BlockPlacedEvent
type BlockPlacedEvent struct {
	*EventPacket
	Body BlockPlacedBody `json:"body"`
}

// ItemUsedBody
type ItemUsedBody struct {
	Count     int            `json:"count"`
	Item      mctypes.Item   `json:"item"`
	Player    mctypes.Player `json:"player"`
	UseMethod int            `json:"useMethod"`
}

// ItemUsedEvent
type ItemUsedEvent struct {
	*EventPacket
	Body ItemUsedBody `json:"body"`
}

// PlayerJoinBody
type PlayerJoinBody struct {
	Player mctypes.Player `json:"player"`
}

// PlayerJoinEvent
type PlayerJoinEvent struct {
	*EventPacket
	Body PlayerJoinBody `json:"body"`
}

// PlayerLeaveBody
type PlayerLeaveBody struct {
	Player mctypes.Player `json:"player"`
}

// PlayerLeaveEvent
type PlayerLeaveEvent struct {
	*EventPacket
	Body PlayerLeaveBody `json:"body"`
}
