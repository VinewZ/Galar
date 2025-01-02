package main

import (
	"embed"
	"log"

	"github.com/VinewZ/galar/pkg/app"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

// Embed frontend assets
//
//go:embed all:frontend/dist
var assets embed.FS

const (
	appTitle     = "Galar"
	appWidth     = 800
	appHeight    = 400
	maxAppWidth  = 800
	maxAppHeight = 400
)

func main() {
	app := app.NewApp()
	if err := wails.Run(createAppOptions(app)); err != nil {
		log.Fatalf("Failed to start application: %v", err)
	}
}

// createAppOptions sets up the Wails application options.
func createAppOptions(a *app.App) *options.App {
	return &options.App{
		Title:         appTitle,
		Width:         appWidth,
		Height:        appHeight,
		MaxWidth:      maxAppWidth,
		MaxHeight:     maxAppHeight,
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
