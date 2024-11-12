package events

import (
	"encoding/json"
	"log"
)

// MessageType The type of message
type MessageType string

//goland:noinspection GoUnusedConst
const (
	Chat MessageType = "chat"
	Say  MessageType = "say"
	Tell MessageType = "tell"
)

// PlayerMessageBody The body of a player message event
type PlayerMessageBody struct {
	Message  string      `json:"message"`
	Sender   string      `json:"sender"`
	Receiver string      `json:"receiver"`
	Type     MessageType `json:"type"`
}

// PlayerMessageEvent Event for when a player sends a message
type PlayerMessageEvent struct {
	*EventPacket
	Body PlayerMessageBody `json:"body"`
}

// HandlePlayerMessage Handle the player message event
//
//goland:noinspection GoUnusedParameter
func HandlePlayerMessage(id string, msg []byte, packetJSON map[string]interface{}, event *EventPacket) {
	playerMessage := &PlayerMessageEvent{EventPacket: event}
	body, err := json.Marshal(event.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = json.Unmarshal(body, &playerMessage.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Printf("[%s] [Event] %s: %s", id, playerMessage.Body.Sender, playerMessage.Body.Message)
}
