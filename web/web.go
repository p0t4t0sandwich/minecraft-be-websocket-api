package web

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/a-h/templ"
	server "github.com/p0t4t0sandwich/minecraft-be-websocket-api/src"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/commands"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/events"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/src/protocol/mctypes"
	"github.com/p0t4t0sandwich/minecraft-be-websocket-api/web/components"
)

type Config struct {
	BannedMobs  []string       `json:"banned_entities"`
	BannedItems []string       `json:"banned_items"`
	Players     []SimplePlayer `json:"players"`
}

func NewConfig() *Config {
	configFile, err := os.ReadFile("./config.json")
	if err != nil {
		log.Fatal(err)
	}
	var config Config
	_ = json.Unmarshal(configFile, &config)
	if config.BannedMobs == nil {
		config.BannedMobs = []string{}
	}
	if config.BannedItems == nil {
		config.BannedItems = []string{}
	}
	if config.Players == nil {
		config.Players = []SimplePlayer{}
	}
	return &config
}

func (c *Config) GetPlayerById(id int) *SimplePlayer {
	for _, player := range c.Players {
		if player.Id == id {
			return &player
		}
	}
	return nil
}

func (c *Config) AddPlayer(player mctypes.Player) {
	p := c.GetPlayerById(player.Id)
	if p == nil {
		c.Players = append(c.Players, *NewSimplePlayer(player))
	} else {
		if p.FakeName != player.Name {
			p.FakeName = player.Name
		}
	}
}

func (c *Config) RenamePlayer(id int, name string) {
	p := c.GetPlayerById(id)
	if p != nil {
		p.Name = name
	}
}

// RemovePlayer Just removes their Fake name, not the stored player obj
func (c *Config) RemovePlayer(id int) {
	p := c.GetPlayerById(id)
	if p != nil {
		p.FakeName = ""
	}
}

func (c *Config) Save() {
	configFile, _ := json.MarshalIndent(c, "", "  ")
	_ = os.WriteFile("./config.json", configFile, 0644)
}

type SimplePlayer struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	FakeName string `json:"-"`
}

func NewSimplePlayer(player mctypes.Player) *SimplePlayer {
	return &SimplePlayer{
		Id:       player.Id,
		Name:     "Unknown",
		FakeName: player.Name,
	}
}

type LogWriter struct {
	FileName     string
	RecentEvents []string
}

func NewLogWriter(fileName string) *LogWriter {
	return &LogWriter{
		FileName:     fileName,
		RecentEvents: []string{},
	}
}

func (w *LogWriter) Write(p []byte) (n int, err error) {
	if len(w.RecentEvents) > 12 {
		w.RecentEvents = w.RecentEvents[1:]
	}
	if strings.Contains(string(p), "[Event]") && !strings.Contains(string(p), "PlayerTravelled") {
		w.RecentEvents = append(w.RecentEvents, string(p))
	}

	fmt.Print(string(p))
	f, err := os.OpenFile(w.FileName, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return 0, err
	}
	defer func(f *os.File) {
		err := f.Close()
		if err != nil {
			log.Println(err.Error())
		}
	}(f)
	return f.Write(p)
}

//goland:noinspection GoNameStartsWithPackageName
type WebServer struct {
	wss        *server.WebSocketServer
	Config     *Config
	LogWriter  *LogWriter
	Label      string
	PlayerList map[int]mctypes.Player
}

func NewWebServer(wss *server.WebSocketServer, Config *Config) *WebServer {
	ws := &WebServer{
		wss:        wss,
		Config:     Config,
		LogWriter:  NewLogWriter("latest.log"),
		Label:      "",
		PlayerList: make(map[int]mctypes.Player),
	}
	log.SetOutput(ws.LogWriter)

	go func() {
		time.Sleep(1 * time.Second)
		for _, bannedMob := range ws.Config.BannedMobs {
			err := wss.SendPacket(ws.Label, commands.NewCommandPacket(fmt.Sprintf("kill @e[type=%s]", bannedMob)))
			if err != nil {
				log.Println(err.Error())
				return
			}
		}
		for _, bannedItem := range ws.Config.BannedItems {
			err := wss.SendPacket(ws.Label, commands.NewCommandPacket(fmt.Sprintf("clear @a %s", bannedItem)))
			if err != nil {
				log.Println(err.Error())
				return
			}
		}
	}()

	return ws
}

//goland:noinspection GoUnusedParameter
func (ws *WebServer) HandleWebSocketConnect(id string, msg []byte, packetJSON map[string]interface{}, event *events.EventPacket) {
	err := ws.wss.SendPacket(ws.Label, events.NewEventSubPacket(events.PlayerJoin, protocol.SubscribeType))
	if err != nil {
		log.Println(err.Error())
		err = nil
	}
	err = ws.wss.SendPacket(ws.Label, events.NewEventSubPacket(events.PlayerLeave, protocol.SubscribeType))
	if err != nil {
		log.Println(err.Error())
		err = nil
	}
	err = ws.wss.SendPacket(ws.Label, events.NewEventSubPacket(events.PlayerTravelled, protocol.SubscribeType))
	if err != nil {
		log.Println(err.Error())
		err = nil
	}
	err = ws.wss.SendPacket(ws.Label, events.NewEventSubPacket(events.PlayerMessage, protocol.SubscribeType))
	if err != nil {
		log.Println(err.Error())
	}
}

//goland:noinspection GoUnusedParameter
func (ws *WebServer) HandlePlayerJoin(id string, msg []byte, packetJSON map[string]interface{}, event *events.EventPacket) {
	playerJoin := &events.PlayerJoinEvent{EventPacket: event}
	body, err := json.Marshal(event.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = json.Unmarshal(body, &playerJoin.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}

	ws.Config.AddPlayer(playerJoin.Body.Player)
	ws.Config.Save()
}

//goland:noinspection GoUnusedParameter
func (ws *WebServer) HandlePlayerLeave(id string, msg []byte, packetJSON map[string]interface{}, event *events.EventPacket) {
	playerLeave := &events.PlayerLeaveEvent{EventPacket: event}
	body, err := json.Marshal(event.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = json.Unmarshal(body, &playerLeave.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}

	p := ws.Config.GetPlayerById(playerLeave.Body.Player.Id)
	if p != nil {
		ws.Config.RemovePlayer(playerLeave.Body.Player.Id)
		ws.Config.Save()
	}
}

//goland:noinspection GoUnusedParameter
func (ws *WebServer) HandlePlayerTravelled(id string, msg []byte, packetJSON map[string]interface{}, event *events.EventPacket) {
	playerTravelled := &events.PlayerTravelledEvent{EventPacket: event}
	body, err := json.Marshal(event.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = json.Unmarshal(body, &playerTravelled.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}

	ws.PlayerList[playerTravelled.Body.Player.Id] = playerTravelled.Body.Player
	ws.Config.Save()
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
		htmlList := "<div id=\"entityList\"><p>Banned entities:</p><ul class=\"bg-orange-200\">"
		for _, bannedMob := range ws.Config.BannedMobs {
			// TODO: Improve this later
			err := ws.wss.SendPacket(ws.Label, commands.NewCommandPacket(fmt.Sprintf("remove @e[type=%s]", bannedMob)))
			if err != nil {
				log.Println(err.Error())
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			//
			htmlList += fmt.Sprintf("<li>%s</li>", bannedMob)
		}
		htmlList += "</ul><div hx-post=\"/entitylist\" hx-trigger=\"every 2s\" hx-target=\"#entityList\" hx-swap=\"outerHTML\"></div></div>"
		_, err := w.Write([]byte(htmlList))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
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
		htmlList := "<div id=\"itemList\"><p>Banned items:</p><ul class=\"bg-orange-200\">"
		for _, bannedItem := range ws.Config.BannedItems {
			// TODO: Improve this later
			err := ws.wss.SendPacket(ws.Label, commands.NewCommandPacket(fmt.Sprintf("clear @a %s", bannedItem)))
			if err != nil {
				log.Println(err.Error())
				return
			}
			//
			htmlList += fmt.Sprintf("<li>%s</li>", bannedItem)
		}
		htmlList += "</ul><div hx-post=\"/itemlist\" hx-trigger=\"every 2s\" hx-target=\"#itemList\" hx-swap=\"outerHTML\"></div></div>"
		_, err := w.Write([]byte(htmlList))
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}))
	router.Handle("POST /playerlist", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		htmlList := "<div id=\"playerList\"><p>Players:</p><ul class=\"bg-orange-200\">"
		for _, player := range ws.Config.Players {
			htmlList += fmt.Sprintf("<table><tr><td>%s</td><td>%s</td></tr></table>", player.Name, player.FakeName)
		}
		htmlList += "</ul><div hx-post=\"/playerlist\" hx-trigger=\"every 2s\" hx-target=\"#playerList\" hx-swap=\"outerHTML\"></div></div>"
		_, err := w.Write([]byte(htmlList))
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}))
	router.Handle("POST /eventlog", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		htmlList := "<div id=\"eventLog\"><p>Recent events:</p><ul class=\"bg-yellow-200\">"
		for _, event := range ws.LogWriter.RecentEvents {
			htmlList += fmt.Sprintf("<li>%s</li>", event)
		}
		htmlList += "</ul><div hx-post=\"/eventlog\" hx-trigger=\"every 2s\" hx-target=\"#eventLog\" hx-swap=\"outerHTML\"></div></div>"
		_, err := w.Write([]byte(htmlList))
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}))
	return router
}
