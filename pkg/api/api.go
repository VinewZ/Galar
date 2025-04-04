package api

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/vinewz/galar/pkg/app"
)

const (
	PORT = 9999
)

func Init() {
	// Get the plugins directory path
	pluginsDir, err := app.GetPluginsDir()
	if err != nil {
		log.Fatalf("Failed to get plugins directory: %v", err)
	}

	// Set up Gin router
	router := gin.Default()

	// Serve static files from the plugins directory
	router.Static("/api/plugins", pluginsDir)

	// Start the server
	port := fmt.Sprintf(":%d", PORT)
	go func() {
		fmt.Printf("Serving plugins from %s on port %d\n", pluginsDir, PORT)
		err := router.Run(port)
		if err != nil {
			log.Fatalf("Failed to start API server: %v", err)
		}
	}()
}
