package mctypes

// NameSpace enum
type NameSpace string

//goland:noinspection GoUnusedConst
const (
	MinecraftNameSpace = "minecraft"
)

// Block type
type Block struct {
	Item
}

// Item type
type Item struct {
	Aux       int       `json:"aux"`
	Id        string    `json:"id"`
	NameSpace NameSpace `json:"namespace"`
}

// PlayerType enum
type PlayerType string

//goland:noinspection GoUnusedConst
const (
	MinecraftPlayer PlayerType = "minecraft:player"
)

// Player type
type Player struct {
	Color     string     `json:"color"`
	Dimension int        `json:"dimension"`
	Id        int        `json:"id"`
	Name      string     `json:"name"`
	Position  Position   `json:"position"`
	Type      PlayerType `json:"type"`
	Varient   int        `json:"varient"`
	YRot      float64    `json:"yRot"`
}

// Position type
type Position struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
	Z float64 `json:"z"`
}

// Tool type
type Tool struct {
	Enchantments  []string `json:"enchantments"`
	FreeStackSize int      `json:"freeStackSize"`
	MaxStackSize  int      `json:"maxStackSize"`
	StackSize     int      `json:"stackSize"`
}
