package filesystem

import (
	"bufio"
	"os"
	"path/filepath"
	"strings"

	"github.com/vinewz/galar/internal/utils"
)

type App struct {
	Name string
	Icon string
	Exec string
}

func GetApps(APPS_PATH string) ([]App, error) {
	dir, err := os.ReadDir(APPS_PATH)
	if err != nil {
		return []App{}, err
	}

	var apps []App

	for _, entry := range dir {
		app, err := ParseDesktopFile(filepath.Join(APPS_PATH, entry.Name()))
		if err != nil {
			utils.LogError(err, "Can't read desktop file: %v", true)
		}

		apps = append(apps, app)
	}

	return apps, nil
}

func ParseDesktopFile(fPath string) (App, error) {
	file, err := os.ReadFile(fPath)
	if err != nil {
		return App{}, err
	}

	mainSection := getMainSection(string(file))

	scanner := bufio.NewScanner(strings.NewReader(mainSection))

	app := App{}
	for scanner.Scan() {
		split := strings.Split(scanner.Text(), "=")
		switch split[0] {
		case "Name":
			app.Name = split[1]
		case "Exec":
			app.Exec = split[1]
		case "Icon":
			app.Icon = split[1]
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
