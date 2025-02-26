package app

import (
	"context"
	"fmt"

	hook "github.com/robotn/gohook"
)

// App struct
type App struct {
	ctx               context.Context
	isAppVisible      bool
	inputValue        string
	selectionidx      int
}

const APPS_PATH = "/usr/share/applications"

// NewApp initializes a new App instance
func NewApp() *App {
	return &App{}
}

const (
	metaKeyCode  = 65515 // SUPER key
	spaceKeyCode = 32    // SPACE key
)

// startup initializes the application context and registers global shortcuts
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	go func() {
		defer hook.End()
		s := hook.Start()
		<-hook.Process(s)
	}()

	go func() {
		a.registerGlobalShortcuts()
		a.GetApps(APPS_PATH)
	}()

	DEBUG_PRINTKEYS(false) // Enable or disable key debugging
}

// registerGlobalShortcuts binds global shortcuts to app actions
func (a *App) registerGlobalShortcuts() {
	var superPressed = false

	hook.Register(hook.KeyDown, nil, func(e hook.Event) {
		if e.Rawcode == uint16(metaKeyCode) {
			superPressed = true
		} else if e.Rawcode == uint16(spaceKeyCode) && superPressed {
			if a.isAppVisible {
				a.HideApp()
			} else {
        a.GetApps(APPS_PATH)
				a.ShowApp()
			}
		}
	})

	hook.Register(hook.KeyUp, nil, func(e hook.Event) {
		if e.Rawcode == uint16(metaKeyCode) {
			superPressed = false
		}
	})

	hook.Register(hook.KeyDown, []string{"esc"}, func(e hook.Event) {
		if a.isAppVisible {
			a.HideApp()
		}
	})
}

// DEBUG_PRINTKEYS enables or disables key debugging
func DEBUG_PRINTKEYS(enable bool) {
	if enable {
		hook.Register(hook.KeyDown, nil, func(e hook.Event) {
			fmt.Printf("KeyDown - Rawcode: %v, Keychar: %v\n", e.Rawcode, e.Keychar)
		})
	}
}
