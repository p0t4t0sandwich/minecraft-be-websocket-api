package commands

import "strings"

// CommandName enum
type CommandName string

const (
	Effect      CommandName = "effect"
	GameMode    CommandName = "gamemode"
	GlobalPause CommandName = "globalpause"
	Kill        CommandName = "kill"
	List        CommandName = "list"
	Say         CommandName = "say"
	Summon      CommandName = "summon"
	Teleport    CommandName = "tp"
	Tell        CommandName = "tell"
	Unknown     CommandName = "unknown"
)

// FromString Convert a string to a CommandName
func FromString(s string) CommandName {
	split := strings.Split(s, " ")
	if len(split) == 0 {
		return ""
	}
	return CommandName(split[0])
}
