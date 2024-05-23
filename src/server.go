package server

import (
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/middleware"
	"github.com/rs/cors"
)

type APIServer struct {
	Address  string
	UsingUDS bool
	Router   *http.ServeMux
}

// NewAPIServer - Create a new API server
func NewAPIServer(address string, usingUDS bool) *APIServer {
	return &APIServer{
		Address:  address,
		UsingUDS: usingUDS,
		Router:   http.NewServeMux(),
	}
}

// Setup - Setup the API server
func (s *APIServer) Setup() http.Handler {
	s.Router.HandleFunc("/ws/{id}", WSHandler)
	s.Router.HandleFunc("POST /api/cmd/{id}", CMDHandler)
	s.Router.HandleFunc("POST /api/event/{id}/{name}", EventSubscribeHandler)
	s.Router.HandleFunc("DELETE /api/event/{id}/{name}", EventUnsubscribeHander)
	return middleware.RequestLoggerMiddleware(cors.AllowAll().Handler(s.Router))
}

// Run - Start the API server
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
			os.Remove(s.Address)
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
