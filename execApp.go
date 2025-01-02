package main

import (
	"os"
	"os/exec"
	"runtime"
	"strings"
)

func (a * App) ExecApp(app DesktopApp) error {
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
	}

	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err := cmd.Start()
	if err != nil {
		return err
	}

	return nil
}

// cleanCmd removes arguments from the command such as %U, %F, etc.
func cleanCmd(s string) string {
	split := strings.Split(s, " ")
	cmd := split[0]

	return cmd
}

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
