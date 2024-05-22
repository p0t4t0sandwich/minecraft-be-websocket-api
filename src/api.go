package server

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
)

// CMDHandler - Handle the CMD route
func CMDHandler(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		http.Error(w, "ID is required", http.StatusBadRequest)
		return
	}

	ws, ok := websocketMap[id]
	if !ok {
		http.Error(w, "ID not found", http.StatusNotFound)
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

	msg := protocol.NewCommandPacket(body.Command)
	data, err := json.Marshal(msg)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = ws.WriteMessage(websocket.TextMessage, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
