package ui

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/widget"
	fs "github.com/vinewz/galar/pkg/filesystem"
)

func NewList(data []fs.App) *widget.List {
	list := widget.NewList(
		func() int {
			return len(data)
		},
		func() fyne.CanvasObject {
			return widget.NewLabel("")
		},
		func(i widget.ListItemID, o fyne.CanvasObject) {
			o.(*widget.Label).SetText(data[i].Name)
		})

	return list
}
