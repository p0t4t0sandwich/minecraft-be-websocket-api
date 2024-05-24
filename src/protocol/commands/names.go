package commands

import "strings"

// CommandName enum
type CommandName string

const (
	Effect      CommandName = "effect"
	GameMode    CommandName = "gamemode"
	GlobalPause CommandName = "globalpause"
	List        CommandName = "list"
	Say         CommandName = "say"
	Teleport    CommandName = "tp"
	Tell        CommandName = "tell"
)

// FromString - Convert a string to a CommandName
func FromString(s string) CommandName {
	split := strings.Split(s, " ")
	if len(split) == 0 {
		return CommandName("")
	}
	return CommandName(split[0])
}
