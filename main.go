package main

import (
	"embed"
	"log"

	"github.com/vinewz/galar/pkg/api"
	"github.com/vinewz/galar/pkg/app"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

const (
	APP_TITLE         = "Galar"
	APP_WIDTH         = 800
	APP_HEIGHT        = 400
	MAX_APP_WIDTH     = 800
	MAX_APP_HEIGHT    = 400
	DESKTOP_APPS_PATH = "/usr/share/applications"
)

func main() {
	app := app.NewApp()
	api.Init()

	if err := wails.Run(createAppOptions(app)); err != nil {
		log.Fatalf("Failed to start application: %v", err)
	}
}

// createAppOptions sets up the Wails application options.
func createAppOptions(a *app.App) *options.App {
	return &options.App{
		Title:         APP_TITLE,
		Width:         APP_WIDTH,
		Height:        APP_HEIGHT,
		MaxWidth:      MAX_APP_WIDTH,
		MaxHeight:     MAX_APP_HEIGHT,
		DisableResize: true,
		StartHidden:   true,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup: a.Startup,
		Bind: []interface{}{
			a,
		},
	}
}
