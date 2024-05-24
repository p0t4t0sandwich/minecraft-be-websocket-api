package commands

import "strings"

// CommandName enum
type CommandName string

const (
	GlobalPause CommandName = "globalpause"
)

// FromString - Convert a string to a CommandName
func FromString(s string) CommandName {
	split := strings.Split(s, " ")
	if len(split) == 0 {
		return CommandName("")
	}
	return CommandName(split[0])
}
