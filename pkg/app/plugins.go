package app

import (
	"encoding/json"
	"log"
	"os"
	"path"
)

type Plugin struct {
  Dir     string `json:"dir"`
	ID      int 
	Name    string `json:"name"`
	Entry   string `json:"entry"`
	Style   string `json:"style"`
	Command struct {
		Name string `json:"name"`
		Cmd  string `json:"cmd"`
	} `json:"command"`
}

func (a *App) GetPlugins() ([]Plugin, error) {
	plugin_dir, err := GetPluginsDir()
	if err != nil {
		return nil, err
	}

	plugins, err := os.ReadDir(plugin_dir)
	if err != nil {
		return nil, err
	}

	var allPlugins []Plugin
  pId := 0

	for _, plugin := range plugins {
		if plugin.IsDir() {
			manifestPath := path.Join(plugin_dir, plugin.Name(), "plugin.json")
			data, err := os.ReadFile(manifestPath)
			if err == nil {
				var p Plugin
				err := json.Unmarshal(data, &p)
				if err != nil {
          log.Printf("Skipping invalid plugin %s\nError: %v", plugin.Name(), err)
				}
        p.ID = pId
        p.Dir = plugin.Name()
        pId++
				allPlugins = append(allPlugins, p)
			}
		}
	}

	return allPlugins, nil
}

func GetPluginsDir() (string, error) {
	dir := path.Join(os.Getenv("HOME"), ".config", "galar", "plugins")
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		if err := os.MkdirAll(dir, os.ModePerm); err != nil {
			return "", err
		}
	}

	return dir, nil
}
