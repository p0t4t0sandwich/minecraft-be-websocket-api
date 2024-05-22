package events

// NameSpace enum
type NameSpace string

const (
	MinecraftNameSpace = "minecraft"
)

// Block
type Block struct {
	Item
}

// Item
type Item struct {
	Aux       int       `json:"aux"`
	Id        string    `json:"id"`
	NameSpace NameSpace `json:"namespace"`
}

// PlayerType
type PlayerType string

const (
	MinecraftPlayer PlayerType = "minecraft:player"
)

// Player
type Player struct {
	Color     string `json:"color"`
	Dimension int    `json:"dimension"`
	Id        int    `json:"id"`
	Name      string `json:"name"`
	Position  struct {
		X float64 `json:"x"`
		Y float64 `json:"y"`
		Z float64 `json:"z"`
	} `json:"position"`
	Type    PlayerType `json:"type"`
	Varient int        `json:"varient"`
	YRot    float64    `json:"yRot"`
}

// Tool
type Tool struct {
	Enchantments  []string `json:"enchantments"`
	FreeStackSize int      `json:"freeStackSize"`
	MaxStackSize  int      `json:"maxStackSize"`
	StackSize     int      `json:"stackSize"`
}
