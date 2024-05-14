package server

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
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

		log.Println(string(msg))
	}
}
