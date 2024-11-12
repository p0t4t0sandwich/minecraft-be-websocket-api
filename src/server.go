package server

import (
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/middleware"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/commands"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/events"
	"github.com/rs/cors"
)

type APIServer struct {
	Address  string
	UsingUDS bool
	Router   *http.ServeMux
	WSS      *WebSocketServer
}

// NewAPIServer Create a new API server
func NewAPIServer(address string, usingUDS bool, wss *WebSocketServer) *APIServer {
	return &APIServer{
		Address:  address,
		UsingUDS: usingUDS,
		Router:   http.NewServeMux(),
		WSS:      wss,
	}
}

// Setup Setup the API server
func (s *APIServer) Setup() http.Handler {
	for commandName, callback := range commands.GetCommandListeners() {
		s.WSS.AddCommandListener(commandName, callback)
	}
	for eventName, callback := range events.GetEventListeners() {
		s.WSS.AddEventListener(eventName, callback)
	}

	s.Router.HandleFunc("/ws/{id}", s.WSS.WSHandler)
	s.Router.HandleFunc("POST /api/cmd/{id}", CMDHandler(s.WSS))
	s.Router.HandleFunc("POST /api/event/{id}/{name}", EventSubscribeHandler(s.WSS))
	s.Router.HandleFunc("DELETE /api/event/{id}/{name}", EventUnsubscribeHandler(s.WSS))
	return middleware.RequestLoggerMiddleware(cors.AllowAll().Handler(s.Router))
}

// Run Start the API server
func (s *APIServer) Run() error {
	server := http.Server{
		Addr:    s.Address,
		Handler: s.Setup(),
	}

	if s.UsingUDS {
		c := make(chan os.Signal, 1)
		signal.Notify(c, os.Interrupt, syscall.SIGTERM)
		go func() {
			<-c
			err := os.Remove(s.Address)
			if err != nil {
				return
			}
			os.Exit(1)
		}()

		if _, err := os.Stat(s.Address); err == nil {
			log.Printf("Removing existing socket file %s", s.Address)
			if err := os.Remove(s.Address); err != nil {
				return err
			}
		}

		socket, err := net.Listen("unix", s.Address)
		if err != nil {
			return err
		}
		log.Printf("API Server listening on %s", s.Address)
		return server.Serve(socket)
	} else {
		log.Printf("API Server listening on %s", s.Address)
		return server.ListenAndServe()
	}
}
