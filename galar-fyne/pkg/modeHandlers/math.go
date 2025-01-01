package modehandlers

import (
	"fmt"
	"strings"

	"fyne.io/fyne/v2/widget"
	"github.com/mnogu/go-calculator"
	fs "github.com/vinewz/galar/pkg/filesystem"
)

func HandleMathMode(filteredApps *[]fs.App, apps []fs.App, ev string, lBox, rBox *widget.Label) {
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
