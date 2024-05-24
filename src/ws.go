package server

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/commands"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/events"
)

var upgrader = websocket.Upgrader{}

// WebSocketServer
type WebSocketServer struct {
	conns    map[string]*websocket.Conn
	commands map[uuid.UUID]commands.CommandName
}

// NewWebSocketServer - Create a new WebSocket relay
func NewWebSocketServer() *WebSocketServer {
	return &WebSocketServer{
		conns:    make(map[string]*websocket.Conn),
		commands: make(map[uuid.UUID]commands.CommandName),
	}
}

// Add - Add a connection to the relay
func (r *WebSocketServer) Add(id string, conn *websocket.Conn) {
	r.conns[id] = conn
}

// Remove - Remove a connection from the relay
func (r *WebSocketServer) Remove(id string) {
	delete(r.conns, id)
}

// Send - Send a message to a connection
func (r *WebSocketServer) Send(id string, msg []byte) error {
	conn, ok := r.conns[id]
	if !ok {
		return nil
	}
	return conn.WriteMessage(websocket.TextMessage, msg)
}

// AddCommand - Add a command to the relay
func (r *WebSocketServer) AddCommand(id uuid.UUID, command commands.CommandName) {
	r.commands[id] = command
}

// PopCommand - Pop a command from the relay
func (r *WebSocketServer) PopCommand(id uuid.UUID) (commands.CommandName, bool) {
	command, ok := r.commands[id]
	if ok {
		delete(r.commands, id)
	}
	return command, ok
}

// PopCommand - Pop a command from the relay

// WSHandler - Handle a WebSocket connection
func (wss *WebSocketServer) WSHandler(w http.ResponseWriter, r *http.Request) {
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
	defer wss.Remove(id)
	defer log.Printf("[%s] < Disconnected", id)

	wss.Add(id, ws)
	log.Printf("[%s] > Connected", id)

	for {
		msgType, msg, err := ws.ReadMessage()
		if err != nil {
			log.Println(err.Error())
			return
		} else if msgType != websocket.TextMessage {
			log.Println("Message type is not text")
		}
		wss.HandlePacket(id, msg)
	}
}

// HandlePacket - Handle a packet
func (wss *WebSocketServer) HandlePacket(id string, msg []byte) {
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
		command := &commands.CommandResponse{}
		err = json.Unmarshal(msg, command)
		if err != nil {
			log.Println(err.Error())
			return
		}
		wss.HandleCommand(id, msg, packetJSON, command)
	case protocol.EventType:
		event := &events.EventPacket{}
		err = json.Unmarshal(msg, event)
		if err != nil {
			log.Println(err.Error())
			return
		}
		wss.HandleEvent(id, msg, packetJSON, event)
	default:
		log.Printf("[%s] %s", id, messagePurpose)
		log.Println(string(msg))
	}
}

// HandleCommand - Handle a command packet
func (wss *WebSocketServer) HandleCommand(id string, msg []byte, packetJSON map[string]interface{}, packet *commands.CommandResponse) {
	commandName, ok := wss.PopCommand(packet.Header.RequestId)
	if !ok {
		log.Printf("[%s] Command response: %s", id, packet.Body.StatusMessage)
		return
	}

	if packet.Body.StatusCode != 0 && commandName != "" {
		packet.Body.StatusMessage = strings.ReplaceAll(packet.Body.StatusMessage, "\n", "\n\t\t")
		log.Printf("[%s] Command %s status %d: %s", id, commandName, packet.Body.StatusCode, packet.Body.StatusMessage)
		return
	}

	switch commandName {
	case commands.Effect:
		commands.HandleEffect(id, msg, packetJSON)
	case commands.GameMode:
		commands.HandleGamemode(id, msg, packetJSON)
	case commands.GlobalPause:
		commands.HandleGlobalPause(id, msg, packetJSON)
	case commands.List:
		commands.HandleList(id, msg, packetJSON)
	case commands.Say:
		commands.HandleSay(id, msg, packetJSON)
	case commands.Teleport:
		commands.HandleTeleport(id, msg, packetJSON)
	case commands.Tell:
		commands.HandleTell(id, msg, packetJSON)
	default:
		log.Println(string(msg))
		if packet.Body.StatusCode != 0 {
			log.Printf("[%s] Command status %d: %s", id, packet.Body.StatusCode, packet.Body.StatusMessage)
		} else {
			log.Printf("[%s] Command response: %s", id, packet.Body.StatusMessage)
		}
	}
}

// HandleEvent - Handle an event packet
func (wss *WebSocketServer) HandleEvent(id string, msg []byte, packetJSON map[string]interface{}, event *events.EventPacket) {
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
