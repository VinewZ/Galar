package app

import (
	"context"
	"fmt"

	hook "github.com/robotn/gohook"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx          context.Context
	isAppVisible bool
}

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
	a.registerGlobalShortcuts()
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

// HideApp hides the application window
func (a *App) HideApp() {
	runtime.Hide(a.ctx)
	a.isAppVisible = false
}

// ShowApp shows the application window
func (a *App) ShowApp() {
	runtime.Show(a.ctx)
	a.isAppVisible = true
}

// DEBUG_PRINTKEYS enables or disables key debugging
func DEBUG_PRINTKEYS(enable bool) {
	if enable {
		hook.Register(hook.KeyDown, nil, func(e hook.Event) {
			fmt.Printf("KeyDown - Rawcode: %v, Keychar: %v\n", e.Rawcode, e.Keychar)
		})
	}
}
