package events

import (
	"encoding/json"
	"log"
)

// MessageType
type MessageType string

var (
	Chat MessageType = "chat"
	Say  MessageType = "say"
	Tell MessageType = "tell"
)

// PlayerMessageBody
type PlayerMessageBody struct {
	Message  string      `json:"message"`
	Sender   string      `json:"sender"`
	Receiver string      `json:"receiver"`
	Type     MessageType `json:"type"`
}

// PlayerMessageEvent
type PlayerMessageEvent struct {
	*EventPacket
	Body PlayerMessageBody `json:"body"`
}

// HandlePlayerMessage
func HandlePlayerMessage(id string, event *EventPacket) {
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
