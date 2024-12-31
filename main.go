package main

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"

	"github.com/vinewz/galar/internal/utils"

	in "github.com/vinewz/galar/internal/utils"
	fs "github.com/vinewz/galar/pkg/filesystem"
	mh "github.com/vinewz/galar/pkg/modeHandlers"
	ui "github.com/vinewz/galar/pkg/ui"
)

const APPS_PATH = "/usr/share/applications"

func main() {
	apps, err := fs.GetApps(APPS_PATH)
	if err != nil {
		in.LogError(err, "Failed to get apps", true)
	}
	filteredApps := apps

	a := app.New()
	a.Settings().SetTheme(ui.NewGalarTheme())

	w := a.NewWindow("Galar")
	w.Resize(fyne.NewSize(800, 400))
	w.SetFixedSize(true)
	w.RequestFocus()

  var mode ui.Mode = ui.FILE_EXPLORER
  layout := &ui.GalarLayout{Mode: mode}

  lBox := widget.NewLabel("")
  rBox := widget.NewLabel("")
  list := ui.NewList(filteredApps)
  input := ui.NewEntry(list)

	list.Select(0)
	lBox.Alignment = fyne.TextAlignCenter
	rBox.Alignment = fyne.TextAlignCenter

	input.OnChanged = func(str string) {
		mode = ui.SetMode(str)
		layout.Mode = mode

		objects := []fyne.CanvasObject{input, lBox, rBox, list}
		layout.UpdateLayout(objects)

		switch mode {
		case ui.FILE_EXPLORER:
      
			mh.HandleFileExplorerMode(&filteredApps, apps, str, list)
		case ui.MATH:
			mh.HandleMathMode(&filteredApps, apps, str, lBox, rBox)
		}
	}
	input.OnSubmitted = func(_ string) {
		err = fs.ExecApp(filteredApps[input.SelectedIdx])
		if err != nil {
			utils.LogError(err, "Couldn't launch app: ", true)
		}
		fyne.CurrentApp().Quit()
	}

	content := container.New(
		layout,
		input,
		lBox,
		rBox,
		list,
	)

	w.SetContent(content)
	w.Canvas().Focus(input)
	w.ShowAndRun()
}

