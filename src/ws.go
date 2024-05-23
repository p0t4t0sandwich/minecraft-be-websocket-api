package server

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/events"
)

var (
	upgrader = websocket.Upgrader{}

	// websocketMap - A map of websockets
	websocketMap = make(map[string]*websocket.Conn)
)

func WSHandler(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		http.Error(w, "ID is required", http.StatusBadRequest)
		return
	}

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err.Error())
		return
	}
	defer ws.Close()
	defer delete(websocketMap, id)
	defer log.Printf("[%s] < Disconnected", id)

	websocketMap[id] = ws
	log.Printf("[%s] > Connected", id)

	for {
		msgType, msg, err := ws.ReadMessage()
		if err != nil {
			log.Println(err.Error())
			return
		} else if msgType != websocket.TextMessage {
			log.Println("Message type is not text")
		}
		HandlePacket(id, msg)
	}
}

// HandlePacket - Handle a packet
func HandlePacket(id string, msg []byte) {
	packetJSON := make(map[string]interface{})
	err := json.Unmarshal(msg, &packetJSON)
	if err != nil {
		log.Println(err.Error())
		return
	}

	header, ok := packetJSON["header"].(map[string]interface{})
	if !ok {
		log.Println("Header is not an object")
		return
	}
	messagePurpose, ok := header["messagePurpose"].(string)
	if !ok {
		log.Println("MessagePurpose is not a string")
		return
	}
	switch protocol.MessageType(messagePurpose) {
	case protocol.CommandResponseType:
		response := &protocol.CommandResponse{}
		err = json.Unmarshal(msg, response)
		if err != nil {
			log.Println(err.Error())
			return
		}
		if response.Body.StatusCode != 0 {
			log.Printf("[%s] Command status %d: %s", id, response.Body.StatusCode, response.Body.StatusMessage)
		} else {
			log.Printf("[%s] Command response: %s", id, response.Body.Message)
		}
	case protocol.EventType:
		event := &events.EventPacket{}
		err = json.Unmarshal(msg, event)
		if err != nil {
			log.Println(err.Error())
			return
		}
		HandleEvent(id, event)
	default:
		log.Printf("[%s] %s", id, messagePurpose)
		log.Println(string(msg))
	}
}

// HandleEvent - Handle an event packet
func HandleEvent(id string, event *events.EventPacket) {
	switch event.Header.EventName {
	case events.BlockBroken:
		blockBroken := &events.BlockBrokenEvent{EventPacket: event}
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
	case events.BlockPlaced:
		blockPlaced := &events.BlockPlacedEvent{EventPacket: event}
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
	case events.ItemUsed:
		itemUsed := &events.ItemUsedEvent{EventPacket: event}
		body, err := json.Marshal(event.Body)
		if err != nil {
			log.Println(err.Error())
			return
		}
		err = json.Unmarshal(body, &itemUsed.Body)
		if err != nil {
			log.Println(err.Error())
			return
		}
		log.Printf("[%s] [Event] Item used by %s", id, itemUsed.Body.Player.Name)
	case events.PlayerJoin:
		playerJoin := &events.PlayerJoinEvent{EventPacket: event}
		body, err := json.Marshal(event.Body)
		if err != nil {
			log.Println(err.Error())
			return
		}
		err = json.Unmarshal(body, &playerJoin.Body)
		if err != nil {
			log.Println(err.Error())
			return
		}
		log.Printf("[%s] [Event] Player joined: %s", id, playerJoin.Body.Player.Name)
	case events.PlayerLeave:
		playerLeave := &events.PlayerLeaveEvent{EventPacket: event}
		body, err := json.Marshal(event.Body)
		if err != nil {
			log.Println(err.Error())
			return
		}
		err = json.Unmarshal(body, &playerLeave.Body)
		if err != nil {
			log.Println(err.Error())
			return
		}
		log.Printf("[%s] [Event] Player left: %s", id, playerLeave.Body.Player.Name)
	default:
		log.Printf("[%s] [Event] %s", id, event.Header.EventName)
		log.Println(event.Body)
	}
}
