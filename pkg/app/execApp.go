package app

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"runtime"
	"strings"
)

// ExecApp launches the selected application in a terminal if needed
func (a *App) ExecApp(app DesktopApp) error {
	execCmd := app.Exec
	var cmd *exec.Cmd
	term := getPreferredTerminal()

	switch runtime.GOOS {
	case "linux":
		if app.Terminal == "true" {
			cmd = exec.Command(term, "-e", cleanCmd(execCmd))
		} else {
			cmd = exec.Command(cleanCmd(execCmd))
		}
	default:
		return fmt.Errorf("unsupported platform: %s", runtime.GOOS)
	}

	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	// Start the command
	err := cmd.Start()
	if err != nil {
		log.Printf("Error starting command: %v", err)
		return err
	}

	return nil
}

// cleanCmd removes unwanted arguments such as %U, %F, etc.
func cleanCmd(s string) string {
	split := strings.Split(s, " ")
	cmd := split[0]

	// Optional: Remove additional arguments (e.g., %U, %F, etc.) if present
	// Could use regex to remove common unwanted arguments
	return cmd
}

// getPreferredTerminal returns the preferred terminal or falls back to a list of common terminals
func getPreferredTerminal() string {
	if terminal := os.Getenv("TERMINAL"); terminal != "" {
		return terminal
	}
	terminals := []string{
		"x-terminal-emulator",
		"gnome-terminal",
		"konsole",
		"xfce4-terminal",
		"wezterm",
		"ghostty",
		"kitty",
		"alacritty",
		"lxterminal",
		"st",
	}
	for _, term := range terminals {
		if _, err := exec.LookPath(term); err == nil {
			return term
		}
	}
	return ""
}
