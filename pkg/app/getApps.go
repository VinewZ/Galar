package app

import (
	"bufio"
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

)

type DesktopApp struct {
	Id       int
	Name     string
	Icon     string
	Exec     string
	Terminal string
}

func (a *App) GetApps(APPS_PATH string) ([]DesktopApp, error) {
	dir, err := os.ReadDir(APPS_PATH)
	if err != nil {
		return nil, err
	}

	var apps []DesktopApp
	idCounter := 0

	for _, entry := range dir {
		app, err := ParseDesktopFile(filepath.Join(APPS_PATH, entry.Name()))
		if err != nil {
      msg := fmt.Sprintf("Skipping invalid desktop file %s", entry.Name())
			LogError(err, msg, false)
			continue
		}
		app.Id = idCounter
		idCounter++
		apps = append(apps, app)
	}

	return apps, nil
}

func ParseDesktopFile(fPath string) (DesktopApp, error) {
	file, err := os.Open(fPath)
	if err != nil {
		return DesktopApp{}, err
	}
	defer file.Close()

	var mainSection strings.Builder
	scanner := bufio.NewScanner(file)
	inMainSection := false

	for scanner.Scan() {
		line := scanner.Text()
		if line == "[Desktop Entry]" {
			inMainSection = true
		} else if inMainSection && strings.HasPrefix(line, "[") {
			// Stop processing when a new section starts
			break
		} else if inMainSection {
			mainSection.WriteString(line + "\n")
		}
	}

	if err := scanner.Err(); err != nil {
		return DesktopApp{}, err
	}

	if mainSection.Len() == 0 {
		return DesktopApp{}, errors.New("no valid [Desktop Entry] section found")
	}

	return parseMainSection(mainSection.String())
}

func parseMainSection(section string) (DesktopApp, error) {
	scanner := bufio.NewScanner(strings.NewReader(section))
	app := DesktopApp{}

	for scanner.Scan() {
		line := scanner.Text()
		split := strings.SplitN(line, "=", 2) // Ensure only one split
		if len(split) != 2 {
			continue // Skip malformed lines
		}

		key, value := split[0], split[1]
		switch key {
		case "Name":
			app.Name = value
		case "Exec":
			app.Exec = value
		case "Icon":
			app.Icon = value
		case "Terminal":
			app.Terminal = value
		}
	}

	if err := scanner.Err(); err != nil {
		return DesktopApp{}, err
	}

	return app, nil
}

func LogError(err error, message string, exit bool) {
	if err != nil {
		log.Printf("%s: %v", message, err)
	}
	if exit {
		os.Exit(1)
	}
}
