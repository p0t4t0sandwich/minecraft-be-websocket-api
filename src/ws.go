package server

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

var (
	upgrader = websocket.Upgrader{}

	pongTimeout = 55 * time.Second

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

	websocketMap[id] = ws
	_ = ws.SetWriteDeadline(time.Now().Add(pongTimeout))
	ws.SetPongHandler(func(string) error {
		err = ws.SetWriteDeadline(time.Now().Add(pongTimeout))
		if err != nil {
			log.Println(err.Error())
		}
		return nil
	})

	for {
		msgType, msg, err := ws.ReadMessage()
		if err != nil {
			log.Println(err.Error())
			return
		} else if msgType != websocket.TextMessage {
			log.Println("Message type is not text")
		}

		packet := &protocol.Packet{}
		err = json.Unmarshal(msg, packet)
		if err != nil {
			log.Println(err.Error())
			return
		}

		switch packet.Header.MessagePurpose {
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
		default:
			log.Printf("[%s] %s", id, packet.Header.MessagePurpose)
			log.Println(string(msg))
		}
	}
}
