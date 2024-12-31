package modehandlers

import (
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/widget"
	"github.com/vinewz/galar/internal/utils"
	fs "github.com/vinewz/galar/pkg/filesystem"
)


func HandleFileExplorerMode(filteredApps *[]fs.App, apps []fs.App, ev string, list *widget.List) {
	*filteredApps = utils.Filter(
		apps,
		func(app fs.App) bool {
			return utils.ContainsSubstring(strings.ToLower(app.Name), strings.ToLower(ev))
		})

	list.Length = func() int {
		return len(*filteredApps)
	}

	list.UpdateItem = func(i widget.ListItemID, o fyne.CanvasObject) {
		o.(*widget.Label).SetText((*filteredApps)[i].Name)
	}

	list.Refresh()
	list.Select(0)
}

