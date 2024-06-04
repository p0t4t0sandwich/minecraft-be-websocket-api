package server

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/commands"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/events"
)

// CMDHandler - Handle the CMD route
func CMDHandler(wss *WebSocketServer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		if id == "" {
			http.Error(w, "ID is required", http.StatusBadRequest)
			return
		}

		// Get command from JSON body
		var body struct {
			Command string `json:"cmd"`
		}
		err := json.NewDecoder(r.Body).Decode(&body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		log.Printf("[%s] Sending command %s", id, body.Command)
		msg := commands.NewCommandPacket(body.Command)
		err = wss.SendPacket(id, msg)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		wss.AddCommand(msg.Header.RequestId, commands.FromString(body.Command))
	}
}

// EventSubscribeHandler - Handle the EventSubscribe route
func EventSubscribeHandler(wss *WebSocketServer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		eventName := r.PathValue("name")
		if id == "" {
			http.Error(w, "ID is required", http.StatusBadRequest)
			return
		}
		if eventName == "" {
			http.Error(w, "Event Name is requried", http.StatusBadRequest)
			return
		}

		log.Printf("[%s] Subscribing to event %s", id, eventName)
		err := wss.SendPacket(id, events.NewEventSubPacket(events.EventName(eventName), protocol.SubscribeType))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

// EventUnsubscribeHander - Handle the Unsubscribe route
func EventUnsubscribeHander(wss *WebSocketServer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		eventName := r.PathValue("name")
		if id == "" {
			http.Error(w, "ID is required", http.StatusBadRequest)
			return
		}
		if eventName == "" {
			http.Error(w, "Event Name is requried", http.StatusBadRequest)
			return
		}

		log.Printf("[%s] Unsubscribing from event %s", id, eventName)
		err := wss.SendPacket(id, events.NewEventSubPacket(events.EventName(eventName), protocol.UnsubscribeType))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
