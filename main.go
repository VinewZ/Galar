package main

import (
	"fmt"
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
	"github.com/mnogu/go-calculator"

	"github.com/vinewz/galar/internal/utils"

	in "github.com/vinewz/galar/internal/utils"
	cf "github.com/vinewz/galar/pkg/customFyne"
	fs "github.com/vinewz/galar/pkg/filesystem"
)

const APPS_PATH = "/usr/share/applications"

var (
	layout *cf.MainL
	input  *cf.CustomEntry
	lBox   *widget.Label
	rBox   *widget.Label
	list   *widget.List
)

func main() {
	apps, err := fs.GetApps(APPS_PATH)
	if err != nil {
		in.LogError(err, "Failed to get apps", true)
	}
	filteredApps := apps

	list = widget.NewList(
		func() int {
			return len(filteredApps)
		},
		func() fyne.CanvasObject {
			return widget.NewLabel("")
		},
		func(i widget.ListItemID, o fyne.CanvasObject) {
			o.(*widget.Label).SetText(filteredApps[i].Name)
		})

	input = cf.NewEntry(list)

	var mode cf.Mode
	layout = &cf.MainL{Mode: mode}
	a := app.New()
	w := a.NewWindow("Galar")
	w.Resize(fyne.NewSize(800, 400))
	w.SetFixedSize(true)
	w.RequestFocus()

	input.SetPlaceHolder("Search app")
	input.OnChanged = func(ev string) {
		mode = SetMode(ev)
		objects := []fyne.CanvasObject{input, lBox, rBox, list}
		layout.Mode = mode
		layout.UpdateLayout(objects)
		switch mode {
		case cf.FILE_EXPLORER:
			handleFileExplorerMode(&filteredApps, apps, ev)
		case cf.MATH:
			handleMathMode(&filteredApps, apps, ev)
		}
	}
	input.OnSubmitted = func(ev string) {
		err = fs.ExecApp(filteredApps[input.SelectedIdx].Exec)
		if err != nil {
			utils.LogError(err, "Couldn't launch app: ", true)
		}
		fyne.CurrentApp().Quit()
	}

	lBox = widget.NewLabel("")
	rBox = widget.NewLabel("")

	list.Select(0)

	content := container.New(
		layout,
		input,
		container.NewCenter(lBox),
		container.NewCenter(rBox),
		list,
	)

	w.SetContent(content)
	w.Canvas().Focus(input)
	w.ShowAndRun()
}

func SetMode(str string) cf.Mode {
	var md string
	if len(str) > 0 {
		md = strings.ToLower(strings.Split(str, " ")[0])
	}

	switch md {
	case "$":
		return cf.CURR_CONVERTER
	case "math":
		return cf.MATH
	default:
		return cf.FILE_EXPLORER
	}
}

func handleMathMode(filteredApps *[]fs.App, apps []fs.App, ev string) {
	*filteredApps = apps
	ipText := strings.Split(ev, " ")[1:]
	lBox.SetText(strings.Join(ipText, " "))

  result, err := calculator.Calculate(strings.Join(ipText, " "))
  if err != nil {
    fmt.Println("Couldn't calculate: ", err)
  }
  rStr := fmt.Sprintf("%.2f", result)

	rBox.SetText(rStr)

}

func handleFileExplorerMode(filteredApps *[]fs.App, apps []fs.App, ev string) {
	*filteredApps = utils.Filter(
		apps,
		func(app fs.App) bool {
			return utils.ContainsSubstring(strings.ToLower(app.Name), strings.ToLower(ev))
		})

	list.Refresh()
	list.Select(0)

}
