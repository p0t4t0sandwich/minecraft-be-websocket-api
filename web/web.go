package web

import (
	"net/http"

	"github.com/a-h/templ"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/web/components"
)

type config struct {
	BannedMobs  []string `json:"banned_mobs"`
	BannedItems []string `json:"banned_items"`
}

type WebServer struct {
	Config *config
}

func NewWebServer(config *config) *WebServer {
	return &WebServer{
		Config: config,
	}
}

func ApplyRoutes(router *http.ServeMux) *http.ServeMux {
	router.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))

	router.Handle("/", templ.Handler(components.Root()))
	return router
}
