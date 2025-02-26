package app

import (
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *App) GetGlobalInputValue() string {
	return a.inputValue
}

func (a *App) SetGlobalInputValue(value string) {
	a.inputValue = value
}

func (a *App) GetSelectionIdx() int {
	return a.selectionidx
}

func (a *App) SetSelectionIdx(idx int) {
	a.selectionidx = idx
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
