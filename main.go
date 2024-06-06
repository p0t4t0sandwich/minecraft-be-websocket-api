package main

import (
	"log"
	"os"

	server "github.com/p0t4t0sandwich/minecraft-be-websocket-api/src"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/events"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/web"
)

func main() {
	address := os.Getenv("ADDRESS")
	useUDS := os.Getenv("USE_UDS") == "true"
	if address == "" && useUDS {
		address = "/tmp/go.socket"
	} else if address == "" {
		address = "0.0.0.0:8080"
	}

	logWriter := web.NewLogWriter("latest.log")
	log.SetOutput(logWriter)

	wss := server.NewWebSocketServer()
	server := server.NewAPIServer(address, useUDS, wss)
	ws := web.NewWebServer(wss, web.NewConfig(), logWriter)
	server.Router = ws.ApplyRoutes(server.Router)
	wss.AddEventListener(events.WebSocketConnect, ws.HandleWebSocketConnect)

	log.Fatal(server.Run())
}
