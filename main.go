package main

import (
	"log"
	"os"

	server "github.com/p0t4t0sandwich/minecraft-be-websocket-api/src"
)

func main() {
	address := os.Getenv("ADDRESS")
	useUDS := os.Getenv("USE_UDS") == "true"
	if address == "" && useUDS {
		address = "/tmp/go.socket"
	} else if address == "" {
		address = "0.0.0.0:8080"
	}

	server := server.NewAPIServer(address, useUDS)
	log.Fatal(server.Run())
}