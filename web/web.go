package web

import (
	"net/http"

	"github.com/a-h/templ"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/web/components"
)

func ApplyRoutes(router *http.ServeMux) *http.ServeMux {
	router.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))

	router.Handle("/", templ.Handler(components.Root()))
	return router
}
