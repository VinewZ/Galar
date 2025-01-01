package main

import (
	"bufio"
	"log"
	"os"
	"path/filepath"
	"strings"
)

type DesktopApp struct {
	Name     string
	Icon     string
	Exec     string
	Terminal string
}

func (a *App) GetApps(APPS_PATH string) ([]DesktopApp, error) {
	dir, err := os.ReadDir(APPS_PATH)
	if err != nil {
		return []DesktopApp{}, err
	}

	var apps []DesktopApp

	for _, entry := range dir {
		app, err := ParseDesktopFile(filepath.Join(APPS_PATH, entry.Name()))
		if err != nil {
			LogError(err, "Can't read desktop file: %v", true)
		}

		apps = append(apps, app)
	}

	return apps, nil
}

func ParseDesktopFile(fPath string) (DesktopApp, error) {
	file, err := os.ReadFile(fPath)
	if err != nil {
		return DesktopApp{}, err
	}

	mainSection := getMainSection(string(file))

	scanner := bufio.NewScanner(strings.NewReader(mainSection))

	app := DesktopApp{}
	for scanner.Scan() {
		split := strings.Split(scanner.Text(), "=")
		switch split[0] {
		case "Name":
			app.Name = split[1]
		case "Exec":
			app.Exec = split[1]
		case "Icon":
			app.Icon = split[1]
		case "Terminal":
			app.Terminal = split[1]
		}
	}

	return app, nil
}

func getMainSection(s string) string {
	var content strings.Builder

	scanner := bufio.NewScanner(strings.NewReader(s))

	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, "[") && line != "[Desktop Entry]" {
			return content.String()
		} else {
			content.WriteString(line + "\n")
		}
	}

	return content.String()
}

func LogError(err error, message string, exit bool) {
	if err != nil {
		log.Printf("%s: %v", message, err)
	}

  if exit {
    os.Exit(1)
  }
}
