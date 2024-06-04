package web

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/a-h/templ"
	server "github.com/p0t4t0sandwich/minecraft-be-websocket-api/src"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/commands"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/web/components"
)

type Config struct {
	BannedMobs  []string `json:"banned_entities"`
	BannedItems []string `json:"banned_items"`
}

func NewConfig() *Config {
	configFile, err := os.ReadFile("./config.json")
	if err != nil {
		log.Fatal(err)
	}
	var config Config
	_ = json.Unmarshal(configFile, &config)
	return &config
}

func (c *Config) Save() {
	configFile, _ := json.MarshalIndent(c, "", "  ")
	_ = os.WriteFile("./config.json", configFile, 0644)
}

type WebServer struct {
	wss    *server.WebSocketServer
	Config *Config
	Label  string
}

func NewWebServer(wss *server.WebSocketServer, Config *Config) *WebServer {
	ws := &WebServer{
		wss:    wss,
		Config: Config,
		Label:  "",
	}

	go func() {
		time.Sleep(1 * time.Second)
		for _, bannedMob := range ws.Config.BannedMobs {
			wss.SendPacket(ws.Label, commands.NewCommandPacket(fmt.Sprintf("kill @e[type=%s]", bannedMob)))
		}
		for _, bannedItem := range ws.Config.BannedItems {
			wss.SendPacket(ws.Label, commands.NewCommandPacket(fmt.Sprintf("clear @a %s", bannedItem)))
		}
	}()

	return ws
}

func (ws *WebServer) ApplyRoutes(router *http.ServeMux) *http.ServeMux {
	router.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))

	router.Handle("/", templ.Handler(components.Root()))
	router.Handle("POST /setlabel", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		label := r.FormValue("label")
		ws.Label = label
		w.WriteHeader(http.StatusOK)
	}))
	router.Handle("POST /banentity", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		entity := r.FormValue("entity")
		if entity == "" {
			http.Error(w, "Entity is required", http.StatusBadRequest)
			return
		}
		for _, bannedMob := range ws.Config.BannedMobs {
			if bannedMob == entity {
				http.Error(w, "Entity is already banned", http.StatusBadRequest)
				return
			}
		}
		ws.Config.BannedMobs = append(ws.Config.BannedMobs, entity)
		ws.Config.Save()
		w.WriteHeader(http.StatusOK)
	}))
	router.Handle("GET /banentity", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		entity := r.FormValue("entity")
		if entity == "" {
			http.Error(w, "Entity is required", http.StatusBadRequest)
			return
		}
		for i, bannedMob := range ws.Config.BannedMobs {
			if bannedMob == entity {
				ws.Config.BannedMobs = append(ws.Config.BannedMobs[:i], ws.Config.BannedMobs[i+1:]...)
				ws.Config.Save()
				w.WriteHeader(http.StatusOK)
				return
			}
		}
		http.Error(w, "Entity is not banned", http.StatusBadRequest)
	}))
	router.Handle("POST /entitylist", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		htmlList := "<div id=\"entityList\"><p>Banned entities:</p><ul>"
		for _, bannedMob := range ws.Config.BannedMobs {
			htmlList += fmt.Sprintf("<li>%s</li>", bannedMob)
		}
		htmlList += "</ul><div hx-post=\"/entitylist\" hx-trigger=\"every 2s\" hx-target=\"#entityList\" hx-swap=\"outerHTML\"></div></div>"
		w.Write([]byte(htmlList))
	}))
	router.Handle("POST /banitem", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		item := r.FormValue("item")
		if item == "" {
			http.Error(w, "Item is required", http.StatusBadRequest)
			return
		}
		for _, bannedItem := range ws.Config.BannedItems {
			if bannedItem == item {
				http.Error(w, "Item is already banned", http.StatusBadRequest)
				return
			}
		}
		ws.Config.BannedItems = append(ws.Config.BannedItems, item)
		ws.Config.Save()
		w.WriteHeader(http.StatusOK)
	}))
	router.Handle("GET /banitem", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		item := r.FormValue("item")
		if item == "" {
			http.Error(w, "Item is required", http.StatusBadRequest)
			return
		}
		for i, bannedItem := range ws.Config.BannedItems {
			if bannedItem == item {
				ws.Config.BannedItems = append(ws.Config.BannedItems[:i], ws.Config.BannedItems[i+1:]...)
				ws.Config.Save()
				w.WriteHeader(http.StatusOK)
				return
			}
		}
		http.Error(w, "Item is not banned", http.StatusBadRequest)
	}))
	router.Handle("POST /itemlist", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		htmlList := "<div id=\"itemList\"><p>Banned items:</p><ul>"
		for _, bannedItem := range ws.Config.BannedItems {
			htmlList += fmt.Sprintf("<li>%s</li>", bannedItem)
		}
		htmlList += "</ul><div hx-post=\"/itemlist\" hx-trigger=\"every 2s\" hx-target=\"#itemList\" hx-swap=\"outerHTML\"></div></div>"
		w.Write([]byte(htmlList))
	}))
	return router
}
