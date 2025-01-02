package main

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

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	var superPressed = false
	metaKeyCode := 65515 // SUPER
	spaceKeyCode := 32
	// gKeyCode := 103 // GALAR

	go func() {
		hook.Register(hook.KeyDown, nil, func(e hook.Event) {
      // DEBUG_PRINKEYS()
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
			// Reset Super key state when released
			if e.Rawcode == uint16(metaKeyCode) {
				superPressed = false
			}
		})

		hook.Register(hook.KeyDown, []string{"esc"}, func(e hook.Event) {
			if a.isAppVisible {
				a.HideApp()
			}
		})

		s := hook.Start()
		<-hook.Process(s)
	}()
}

func (a *App) HideApp() {
	runtime.Hide(a.ctx)
	a.isAppVisible = false
}

func (a *App) ShowApp() {
	runtime.Show(a.ctx)
	a.isAppVisible = true
}

func DEBUG_PRINTKEYS() {
	hook.Register(hook.KeyDown, nil, func(e hook.Event) {
    fmt.Printf("KeyDown - Rawcode: %v, Keychar: %v\n", e.Rawcode, e.Keychar)
	})
}
